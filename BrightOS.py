import math
import os
import datetime
import tkinter as tk
from tkinter import ttk
import threading
import queue
import telemetrix_uno_r4_wifi
from simple_plugin_loader import Loader
from contextlib import redirect_stdout, redirect_stderr
import io


def safe_listdir(path):
  try:
    return os.listdir(path)
  except FileNotFoundError:
    return []


plugin_dir = os.path.expandvars("C:\\Users\\%USER%\\AppData\\Local\\BrightOS\\Plugins")
script_dir = os.path.expandvars("C:\\Users\\%USER%\\AppData\\Local\\BrightOS\\Scripts")

pluginlist = safe_listdir(plugin_dir)
scriptlist = safe_listdir(script_dir)
# initialize the loader
loader = Loader()

# load your plugins
plugins = loader.load_plugins(plugin_dir, pluginlist)
scripts = loader.load_plugins(script_dir, scriptlist)


def ChooseScript(plugins, scripts):
  output_queue = queue.Queue()
  running_thread = {"thread": None, "script": None}

  root = tk.Tk()
  root.title("BrightOS")

  ttk.Label(root, text="Select a script to run").pack(padx=10, pady=(10, 5))

  has_scripts = bool(scripts)

  if has_scripts:
    script_keys = list(scripts.keys())
    display_map = {str(k): k for k in script_keys}
    selected = tk.StringVar(value=str(script_keys[0]))
    options = list(display_map.keys())
  else:
    display_map = {}
    selected = tk.StringVar(value="No scripts")
    options = ["No scripts"]
    ttk.Label(root, text="No scripts found").pack(padx=10, pady=(0, 10))

  ttk.Combobox(root, textvariable=selected, values=options, state="readonly").pack(padx=10, pady=(0, 10))

  output = tk.Text(root, height=12, width=60, state=tk.DISABLED)
  output.pack(padx=10, pady=(0, 10))

  def append_output(msg):
    output.configure(state=tk.NORMAL)
    output.insert(tk.END, msg + "\n")
    output.see(tk.END)
    output.configure(state=tk.DISABLED)

  def poll_output():
    try:
      while True:
        msg = output_queue.get_nowait()
        append_output(msg)
    except queue.Empty:
      pass
    root.after(100, poll_output)

  def run_selected():
    if running_thread["thread"] and running_thread["thread"].is_alive():
      append_output("A script is already running.")
      return

    key = display_map.get(selected.get())
    if key is None:
      append_output("No script selected.")
      return

    scripttorun = scripts.get(key)
    if not (scripttorun and hasattr(scripttorun, "main")):
      append_output("Selected script cannot be run.")
      return

    append_output(f"Running script: {key}")

    def target():
      class QueueWriter(io.StringIO):
        def write(self, s):
          super().write(s)
          if s and s != "\n":
            output_queue.put(s.rstrip("\n"))

      buf = QueueWriter()
      try:
        with redirect_stdout(buf), redirect_stderr(buf):
          scripttorun.main(plugins)
        output_queue.put("Script finished.")
      except Exception as exc:
        output_queue.put(f"Script error: {exc}")

    thread = threading.Thread(target=target, daemon=True)
    running_thread["thread"] = thread
    running_thread["script"] = scripttorun
    thread.start()

  def stop_running():
    thread = running_thread.get("thread")
    scripttorun = running_thread.get("script")
    if thread and thread.is_alive():
      if scripttorun and hasattr(scripttorun, "stop"):
        try:
          scripttorun.stop()
          append_output("Stop requested via script stop().")
        except Exception as exc:
          append_output(f"Stop failed: {exc}")
      else:
        append_output("Stop not supported for this script; ensure your script implements stop().")
    else:
      append_output("No running script to stop.")

  ttk.Button(root, text="Run", command=run_selected, state=tk.NORMAL if has_scripts else tk.DISABLED).pack(padx=10, pady=(0, 5))
  ttk.Button(root, text="Stop", command=stop_running).pack(padx=10, pady=(0, 10))

  append_output(f"Plugins loaded: {len(plugins)}, Scripts loaded: {len(scripts)}")

  poll_output()
  root.mainloop()


if __name__ == "__main__":
  ChooseScript(plugins, scripts)

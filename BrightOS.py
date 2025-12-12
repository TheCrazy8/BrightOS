import math
import os
import datetime
import tkinter as tk
import telemetrix_uno_r4_wifi
from simple_plugin_loader import Loader


def safe_listdir(path):
  try:
    return os.listdir(path)
  except FileNotFoundError:
    return []


plugin_dir = os.path.expandvars("C:\\Users\\%USER%\\Appdata\\Local\\BrightOS\\Plugins")
script_dir = os.path.expandvars("C:\\Users\\%USER%\\Appdata\\Local\\BrightOS\\Scripts")

pluginlist = safe_listdir(plugin_dir)
scriptlist = safe_listdir(script_dir)
# initialize the loader
loader = Loader()

# load your plugins
plugins = loader.load_plugins(plugin_dir, pluginlist)
scripts = loader.load_plugins(script_dir, scriptlist)
print(plugins)
print(scripts)


def ChooseScript(plugins, scripts):
  root = tk.Tk()
  root.title("BrightOS")

  tk.Label(root, text="Select a script to run").pack(padx=10, pady=(10, 5))

  if not scripts:
    tk.Label(root, text="No scripts found").pack(padx=10, pady=(0, 10))
    root.mainloop()
    return

  script_keys = list(scripts.keys())
  display_map = {str(k): k for k in script_keys}

  selected = tk.StringVar(value=str(script_keys[0]))
  tk.OptionMenu(root, selected, *display_map.keys()).pack(padx=10, pady=(0, 10))

  def run_selected():
    key = display_map.get(selected.get())
    if key is None:
      return
    scripttorun = scripts.get(key)
    if scripttorun:
      scripttorun.main(plugins)
      root.destroy()

  tk.Button(root, text="Run", command=run_selected).pack(padx=10, pady=(0, 10))
  root.mainloop()


if __name__ == "__main__":
  ChooseScript(plugins, scripts)

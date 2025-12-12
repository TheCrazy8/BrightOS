import time

try:
  from telemetrix_uno_r4.wifi.telemetrix_uno_r4_wifi.telemetrix_uno_r4_wifi import TelemetrixUnoR4WiFi
except ImportError:
  TelemetrixUnoR4WiFi = None

_board = None
_created_locally = False

def main(plugins):
  global _board, _created_locally
  _board = plugins.get("telemetrix") if isinstance(plugins, dict) else None
  _created_locally = False

  if _board is None and TelemetrixUnoR4WiFi:
    _board = TelemetrixUnoR4WiFi()
    _created_locally = True

  if not _board:
    print("Telemetrix board unavailable.")
    return

  _board.enable_scroll_message("example script")
  time.sleep(5)
  _board.disable_scroll_message()

  if _created_locally:
    _board.shutdown()


def stop():
  if _board:
    try:
      _board.disable_scroll_message()
    except Exception:
      pass
    if _created_locally:
      try:
        _board.shutdown()
      except Exception:
        pass

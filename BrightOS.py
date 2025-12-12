import math
import os
import datetime
import tkinter as tk
import telemetrix_uno_r4_wifi
from simple_plugin_loader import Loader


pluginlist = os.listdir(f"C:\\Users\%USER%\Appdata\Local\BrightOS\Plugins")
scriptlist = os.listdir(f"C:\\Users\%USER%\Appdata\Local\BrightOS\Scripts")
# initialize the loader
loader = Loader()

# load your plugins
plugins = loader.load_plugins("C:\\Users\%USER%\Appdata\Local\BrightOS\Plugins", pluginlist)
scripts = loader.load_plugins("C:\\Users\%USER%\Appdata\Local\BrightOS\Scripts", scriptlist)
print(plugins)
print(scripts)

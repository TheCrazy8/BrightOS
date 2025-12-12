import math
import os
import datetime
import tkinter as tk
import telemetrix_uno_r4_wifi
from simple_plugin_loader import Loader


pluginlist = os.listdir(f"C:\\Users\%USER%\Appdata\Local\BrightOS\Plugins")
# initialize the loader
loader = Loader()

# load your plugins
plugins = loader.load_plugins("C:\\Users\%USER%\Appdata\Local\BrightOS\Plugins", pluginlist)
print(plugins)

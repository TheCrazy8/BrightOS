#region VEXcode Generated Robot Configuration
from vex import *
import urandom
import math

# Brain should be defined by default
brain=Brain()

# Robot configuration code
brain_inertial = Inertial()
LeftMotor = Motor(Ports.PORT1, False)
RightMotor = Motor(Ports.PORT6, True)
controller = Controller()



# generating and setting random seed
def initializeRandomSeed():
    wait(100, MSEC)
    xaxis = brain_inertial.acceleration(XAXIS) * 1000
    yaxis = brain_inertial.acceleration(YAXIS) * 1000
    zaxis = brain_inertial.acceleration(ZAXIS) * 1000
    systemTime = brain.timer.system() * 100
    urandom.seed(int(xaxis + yaxis + zaxis + systemTime)) 
    
# Initialize random seed 
initializeRandomSeed()

#endregion VEXcode Generated Robot Configuration

remote_control_code_enabled = True
screen_precision = 0
console_precision = 0
deadBand = 0
pausecalc = 0

def Startup():
    global deadBand, pausecalc, remote_control_code_enabled, screen_precision, console_precision
    remote_control_code_enabled = False
    brain.play_sound(SoundType.FILLUP)
    brain.screen.set_pen_color(Color.RED)
    brain.screen.set_fill_color(Color.YELLOW)
    brain.screen.print("BrightOS")
    wait(1, SECONDS)
    brain.screen.clear_screen()
    brain.screen.set_pen_color(Color.BLUE)
    brain.screen.set_fill_color(Color.WHITE)
    remote_control_code_enabled = True
    brain.timer.clear()

def main():
    global deadBand, pausecalc, remote_control_code_enabled, screen_precision, console_precision
    Startup()
    pausecalc = 0
    deadBand = 5
    while True:
        timer()
        drive()
        # Add other functions here
        pause()
        if brain.battery.capacity() <= 10:
            brain.screen.print("BATTERY LOW")
            brain.screen.clear_screen()
        wait(20, MSEC)

# Used to find the format string for printing numbers with the
# desired number of decimal places
def console_format(variable):
    # If the input is a string, return it as is
    if isinstance(variable, str):
        return variable
    # Otherwise, apply precision logic for numbers
    precision = 0
    # Equivalent to setting precision to 'All Digits'
    if console_precision is None:
        precision = 6
    else:
        precision = console_precision
    return "{0:.{1}f}".format(variable, precision)

def timer():
    global deadBand, pausecalc, remote_control_code_enabled, screen_precision, console_precision
    print(console_format(brain.timer.time(SECONDS)), end="")
    print("\033[2J")

def pause():
    global deadBand, pausecalc, remote_control_code_enabled, screen_precision, console_precision
    if brain.buttonCheck.pressing():
        pausecalc = 1
        brain.screen.print("PAUSED")
        LeftMotor.stop()
        RightMotor.stop()
        while not not brain.buttonCheck.pressing():
            wait(20, MSEC)
        while not pausecalc == 0:
            if brain.buttonCheck.pressing():
                pausecalc = 0
                brain.screen.clear_screen()
            wait(20, MSEC)

def drive():
    global deadBand, pausecalc, remote_control_code_enabled, screen_precision, console_precision
    if math.fabs(controller.axisD.position()) + math.fabs(controller.axisC.position()) > deadBand:
        LeftMotor.set_velocity((controller.axisD.position() + controller.axisC.position()), PERCENT)
        RightMotor.set_velocity((controller.axisD.position() - controller.axisC.position()), PERCENT)
    else:
        LeftMotor.set_velocity(0, PERCENT)
        RightMotor.set_velocity(0, PERCENT)
    LeftMotor.spin(FORWARD)
    RightMotor.spin(FORWARD)

main()

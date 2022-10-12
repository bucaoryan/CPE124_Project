#Group03 Source Code for CPE124_Project#

import RPi.GPIO as GPIO
import time
from time import sleep
import csv
import pandas as pd

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(20, GPIO.IN) #pir for alcohol

Relay_1_GPIO = 23 #alcohol

GPIO.setup(Relay_1_GPIO, GPIO.OUT)

count = 0
measurement_ml = 450
number_of_pumps = 0
STATUS0 = "FULL"
STATUS1 = "NEEDS TO BE REFILLED"
header0 = ['Volume Capacity', 'Total Count', 'Last Time System Used']
measure_count_log =[]

try:
    while True:
        if number_of_pumps < measurement_ml:
            print("FULL")
            j = GPIO.input(20)
            if j==0:
                #print("no hand")
                GPIO.output(Relay_1_GPIO, GPIO.LOW)
            elif j==1:
                print("SYSTEM ACTIVATED")
                GPIO.output(Relay_1_GPIO, GPIO.LOW)
                time.sleep(1)
                GPIO.output(Relay_1_GPIO, GPIO.HIGH)
                count +=1
                number_of_pumps += 10
                measure_count_log =  [[STATUS0, count, time.ctime()]]

                with open('/frontend/capacity_count_currentmeasure.csv', 'w+', newline='') as file0:
                    dw = csv.DictWriter(file0, delimiter=',', fieldnames=header0)
                    dw.writeheader()
                    writer = csv.writer(file0)
                    writer.writerows(measure_count_log)
                    file0.flush()
                file0.close()
                
                with open('/frontend/systemlog.csv', 'a+', newline='') as file:
                    writer = csv.writer(file)
                    current_date_time = time.ctime()
                    writer.writerow(["ACTIVATED", current_date_time, "LIBRARY"])
                    file.flush()
                file.close()
            #time.sleep(2)
        else:
            print('EMPTY')
            measure_count_log =  [[STATUS1, count, time.ctime()]]
            with open('capacity_count_currentmeasure.csv', 'w+', newline='') as file0:
                dw = csv.DictWriter(file0, delimiter=',', fieldnames=header0)
                dw.writeheader()
                writer = csv.writer(file0)
                writer.writerows(measure_count_log)
            time.sleep(5)

except KeyboardInterrupt:
    pass

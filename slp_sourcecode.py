#Group03 Source Code for CPE124_Project#

import RPi.GPIO as GPIO
import time
from time import sleep
import csv

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(20, GPIO.IN) #pir for alcohol

Relay_1_GPIO = 23 #alcohol

GPIO.setup(Relay_1_GPIO, GPIO.OUT)

count = 0
measurement_ml = 450
measure_count_log =[]
number_of_pumps = 0
true_measure = 0
STATUS0 = "FULL"
STATUS1 = "NEEDS TO BE REFILLED"

try:
    while True:
        if number_of_pumps <= measurement_ml:
            #print("FULL")
            j = GPIO.input(20)
            if j==0:
                #print("no hand")
                GPIO.output(Relay_1_GPIO, GPIO.LOW)
                
            elif j==1:
                print("SYSTEM ACTIVATED")
                #date_log.append(time.ctime())
                GPIO.output(Relay_1_GPIO, GPIO.LOW)
                time.sleep(1)
                GPIO.output(Relay_1_GPIO, GPIO.HIGH)
                count +=1
                number_of_pumps += 10
                true_measure = measurement_ml - number_of_pumps
                measure_count_log =  [[STATUS0, count, true_measure]]

                with open('/home/edward/cpe124/frontend/capacity_count_currentmeasure.csv', 'a+', newline='') as file0:
                    writer = csv.writer(file0)
                    writer.writerows(measure_count_log)
                
                with open('/home/edward/cpe124/frontend/systemlog.csv', 'a+', newline='') as file:
                    writer = csv.writer(file)
                    current_date_time = time.ctime()
                    writer.writerow(["ACTIVATED", current_date_time, "LIBRARY"])
                    file.flush()
                file.close()
            #time.sleep(2)

        else:
            print("EMPTY")
            measure_count_log =  [[STATUS1, count, true_measure]]
            time.sleep(60)

except KeyboardInterrupt:
    pass

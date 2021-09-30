#!/bin/bash

export DISPLAY=:0 

SCRIPT=/home/pi/newplayer/app.js 
# Absolute path to output log file
LOG=/home/pi/newplayer/player.log
echo -e "\n####### STARTUP $(date) ######\n" >> $LOG
$SCRIPT >> $LOG 2>&1

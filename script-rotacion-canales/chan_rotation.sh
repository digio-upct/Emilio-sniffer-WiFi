#!/bin/bash
# -*- ENCODING: UTF-8 -*-
iface='wlan0mon'
chan=1
while [ true ]
do
	iwconfig $iface channel $chan
	((chan++))
	if [ $chan -gt 13 ]
	then
		chan=1
	fi
	sleep 3
done

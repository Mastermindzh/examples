#!/usr/bin/env bash

Height=$(tput lines)
Width=$(tput cols)
Height=$((Height / 2))
Width=$(((Width * 2) / 3))

whiptail --yesno --title "Hello!" "This is a whiptail window" $Height $Width


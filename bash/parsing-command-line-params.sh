#!/bin/bash

#  Allow params a b v
# : is used to disable verbosity
while getopts ":abv" opt; do

  # case to handle scenarias
  case $opt in
    a)
      echo "-a passed, Parameter: $OPTARG"
      ;;
    b)
      echo "-b passed, Parameter: $OPTARG"
	  ;;
    v)
	  echo "-v passed, Parameter: $OPTARG"
	  ;;
    # default case
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

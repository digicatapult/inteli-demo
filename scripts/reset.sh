#!/bin/sh
# RUN RESET ALL:
# ./scripts/reset.sh [all]
# Where the argument is optional
# OR RUN RESET INDIVIDUAL PERSONA:
# ./scripts/reset.sh [cust] [am]
# Where all three arguments are optional but minimum one should be present

ARG1=$1;
ARG2=$2;

reset_all() {
	echo ResetAll;
	rm -rf data/cust/;
	rm -rf data/am/;
}

reset_cust() {
	echo ResetCust;
	rm -rf data/cust/;
}

reset_am() {
	echo ResetAM;
	rm -rf data/am/;
}

if [ "$ARG1" == "all" ] || \
[ "$ARG1" == "" ]; then

	reset_all;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ]; then reset_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ]; then reset_am; fi;

fi;

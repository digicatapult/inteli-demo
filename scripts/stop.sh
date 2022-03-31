#!/bin/sh
# RUN STOP:
# ./scripts/stop.sh [all]
# Where the argument is optional
# OR STOP INDIVIDUAL PERSONA:
# ./scripts/stop.sh [cust] [am]

ARG1=$1;
ARG2=$2;
PROJECT="vitalam_demo";
ENVPATH=".env"
COMMONENVPATH="docker/docker.env";
CUSTPATH="docker/docker-compose-cust.yml";
AMPATH="docker/docker-compose-am.yml";

assert_env() {
	echo AssertEnv;
	trap 'rm -f "$COMBINEDENVPATH"' EXIT;
	COMBINEDENVPATH=$(mktemp);
	cat $ENVPATH $COMMONENVPATH > $COMBINEDENVPATH;
}

stop_all() {
	echo StopAll;
	docker-compose -p $PROJECT -f $CUSTPATH --env-file $COMBINEDENVPATH down --remove-orphans;
	docker-compose -p $PROJECT -f $AMPATH --env-file $COMBINEDENVPATH down --remove-orphans;
}

stop_cust() {
	echo StopCust;
	docker-compose -p $PROJECT -f $CUSTPATH --env-file $COMBINEDENVPATH down;
}

stop_am() {
	echo StopAM;
	docker-compose -p $PROJECT -f $AMPATH --env-file $COMBINEDENVPATH down;
}

assert_env;
if [ "$ARG1" == "all" ] || \
[ "$ARG1" == "" ]; then

	stop_all;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ]; then stop_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ]; then stop_am; fi;

fi;

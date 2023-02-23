#!/bin/sh
# RUN BUILD DEFAULT (brings up cust, am):
# ./scripts/build.sh
# RUN BUILD ALL:
# ./scripts/build.sh [all]
# Where the argument is optional
# OR RUN BUILD OF INDIVIDUAL PERSONA:
# ./scripts/build.sh [cust] [am]
# Where all three arguments are optional but minimum two should be present

ARG1=$1;
ARG2=$2;
PROJECT_ALICE="inteli_demo_alice";
PROJECT_BOB="inteli_demo_bob";
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

build_cust() {
	echo BuildCust;
	docker-compose -p $PROJECT_ALICE -f $CUSTPATH --env-file $COMBINEDENVPATH build;
}

build_am() {
	echo BuildAM;
	docker-compose -p $PROJECT_BOB -f $AMPATH --env-file $COMBINEDENVPATH build;
}

assert_env;
if [ "$ARG1" == "all" ] || \
  [ "$ARG1" == "" ]; then

	build_cust; build_am;

else

	if [ "$ARG1" == "cust" ] || \
	[ "$ARG2" == "cust" ]; then build_cust; fi;

	if [ "$ARG1" == "am" ] || \
	[ "$ARG2" == "am" ]; then build_am; fi;

fi;

echo Done;

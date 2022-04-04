#!/bin/sh

PERSONA=$1;
PROJECT="inteli_demo";

print_usage() {
  echo ""
  echo "Reconnects the substrate node for PERSONA to the chain network"
  echo ""
  echo reconnect.sh [PERSONA]
  echo ""
  echo "  PERSONA\tThe persona to reconnect [cust|am]"
  echo ""
}

if [ "$PERSONA" == "cust" ]; then
	CONTAINER="node-alice";
elif [ "$PERSONA" == "am" ]; then
	CONTAINER="node-bob";
elif [ "$PERSONA" == "--help" ]; then
  print_usage;
  exit 0;
else
  echo Invalid arguments to reconnect.sh
  print_usage;
  exit 1;
fi;

check_container() {
  CONTAINER=$1;

  if [ "$( docker container inspect -f '{{.State.Running}}' $CONTAINER )" != "true" ]; then
    echo "Container $CONTAINER is not running!!";
    exit 1
  fi;
}

echo Checking container $CONTAINER is running;

check_container $CONTAINER;

echo Reconnecting container $CONTAINER;

docker network connect ${PROJECT}_chain $CONTAINER;

echo Container $CONTAINER reconnected;

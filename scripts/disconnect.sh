#!/bin/sh

PERSONA=$1;
PROJECT="inteli_demo";

print_usage() {
  echo ""
  echo "Diconnects the substrate node for PERSONA from the chain network"
  echo ""
  echo disconnect.sh [PERSONA]
  echo ""
  echo "  PERSONA\tThe persona to disconnect [cust|am]"
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
  echo Invalid arguments to disconnect.sh
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

echo Disconnecting container $CONTAINER;

docker network disconnect --force ${PROJECT}_chain $CONTAINER;

echo Container $CONTAINER disconnected;

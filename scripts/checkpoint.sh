#!/bin/sh

PERSONA=$1
CHECKPOINT_DIR=$2

print_usage() {
  echo ""
  echo "Backs up data for the substrate node for PERSONA to directory DIR"
  echo ""
  echo checkpoint.sh [PERSONA] [DIR]
  echo ""
  echo "  PERSONA\tThe persona to backup data for [cust|am]"
  echo "  DIR\tThe directory to backup data to"
  echo ""
}

if [ "$PERSONA" == "cust" ]; then
	CONTAINER="node-alice"; NODE_DIR="./data/cust/node";
elif [ "$PERSONA" == "am" ]; then
	CONTAINER="node-bob"; NODE_DIR="./data/am/node";
elif [ "$PERSONA" == "--help" ]; then
  print_usage;
  exit 0;
else
  echo Invalid arguments to checkpoint.sh
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

check_dir() {
  DIR=$1

  if [ "$DIR" == "" ]; then
    echo "Must supply a directory"
    print_usage;
    exit 1;
  fi;

  if [ ! -d "$DIR" ]; then
    mkdir -p $DIR;
    STATUS=$?;
    if [ ! $STATUS -eq 0 ]; then
      echo "Error cannot create directory $DIR";
      exit 1;
    fi;
  fi;
}

check_dir $CHECKPOINT_DIR;

echo Checking container $CONTAINER is running;

check_container $CONTAINER;

echo Stopping $CONTAINER;

docker stop $CONTAINER;

echo Taking container checkpoint;

rm -rf $CHECKPOINT_DIR/*;
cp -R $NODE_DIR/* $CHECKPOINT_DIR;

echo Starting $CONTAINER;

docker start $CONTAINER;

echo Container $PERSONA checkpointed

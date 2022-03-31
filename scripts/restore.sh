#!/bin/sh

PERSONA=$1
CHECKPOINT_DIR=$2

print_usage() {
  echo ""
  echo "Restores a data backup for the substrate node for PERSONA from directory DIR"
  echo ""
  echo restore.sh [PERSONA] [DIR]
  echo ""
  echo "  PERSONA\tThe persona to restore data for [cust|am]"
  echo "  DIR\tThe directory to restore backup data from"
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
  echo Invalid arguments to restore.sh
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
    print_usage
    exit 1;
  fi;

  if [ ! -d "$DIR" ]; then
      echo "Error cannot find directory $DIR"
      exit 1;
  fi;
}

check_dir $CHECKPOINT_DIR;

echo Checking container $CONTAINER is running;

check_container $CONTAINER;

echo Stopping $CONTAINER;

docker stop $CONTAINER;

echo Restoring container checkpoint;

rm -r $NODE_DIR/*;
cp -R $CHECKPOINT_DIR/* $NODE_DIR/;

echo Starting $CONTAINER;

docker start $CONTAINER;

echo Container $PERSONA restored

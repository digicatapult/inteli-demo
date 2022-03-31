# INTELI Demo

## Description

This demo has been built to demonstrate the benefits of distributed systems to the additive-manufacturing industry within aerospace. It provides simple web clients that let you perform the actions of different personas in the industry. The demo relies on technologies built during the VITALam project.

## Getting started

### `git-lfs`

This repository makes use of [git-lfs](https://git-lfs.github.com/) to track certain assets (pdfs) that may be useful when presenting the demo. Therefore when pulling ensure you have `git-lfs` setup and enabled in order to get these assets.

### Managing the demo stack

The demo stack consists of two base personas: the customer (`cust`) and the additive manufacturer (`am`).

Each persona has four containers in its stack:

- A React client for performing actions such as creating and approving orders.
- A [Substrate-based blockchain](https://github.com/digicatapult/vitalam-node) node.
- An [`IPFS`](https://ipfs.io/) node for distributed file storage.
- An [API](https://github.com/digicatapult/vitalam-api) for communication between the client and the two nodes.

### Authentication

The [API](https://github.com/digicatapult/vitalam-api) uses an [Auth0](https://auth0.com/) API to issue a JSON Web Token for authentication to our frontend and to our API. To use this, the Auth0 tenant will need configuring with the API and Applications, as well as the custom login page for styling. After that accounts for any users should be created which will then enable them to login to the frontend applications. Then, so that the React clients can successfully authenticate with their respective APIs you need to set the following environment variables in a `.env` saved at the root of the `inteli-demo` repository (or check/rely on the defaults in `./src/utils/env.js`).

| variable                      | required |                       default                       | description                                                                 |
| :---------------------------- | :------: | :-------------------------------------------------: | :-------------------------------------------------------------------------- |
| AUTH_JWKS_URI                 |    N     | `https://inteli.eu.auth0.com/.well-known/jwks.json` | JSON Web Key Set containing public keys used by the Auth0 API               |
| AUTH_AUDIENCE                 |    N     |                    `inteli-dev`                     | Identifier of the Auth0 API                                                 |
| AUTH_ISSUER                   |    N     |           `https://inteli.eu.auth0.com/`            | Domain of the Auth0 API `                                                   |
| AUTH_TOKEN_URL                |    N     |      `https://inteli.eu.auth0.com/oauth/token`      | Auth0 API endpoint that issues an Authorisation (Bearer) access token       |
| REACT_API_AUTH_CLIENT_ID      |    Y     |                    see `env.js`                     | Client ID provided by Auth0 for the API                                     |
| REACT_API_CUST_AUTH_CLIENT_ID |    Y     |                    see `env.js`                     | Client ID provided by Auth0 for identifying the OEM frontend login requests |
| REACT_API_T1_AUTH_CLIENT_ID   |    Y     |                    see `env.js`                     | Client ID provided by Auth0 for identifying the T1 frontend login requests  |

### Docker setup

In order to run the demo you will need to build and bring up the demo stack using Docker.

Install [Docker](https://docs.docker.com/get-docker/) and
[Docker Compose](https://docs.docker.com/compose/install/).

It's recommended to set your Docker resources higher than the default allocation:

- Minimum of 10 CPUs.
- Minimum of 8GB memory.

### Building the required images

Build the images for each persona's client. This can be done most easily using the [build.sh](./scripts/build.sh) script.

To rebuild all the different persona images, from the root directory of this repository run:

```sh
./scripts/build.sh
```

To rebuild images for individual personas:

```sh
./scripts/build.sh [cust] [am]
```

The other two images for this repo, `vitalam-node` and `vitalam-api`, are pulled automatically from GHCR when bringing up the full set of containers in the next step.

### Bringing up the demo containers

In order to bring up the two main personas of the demo stack run:

```sh
./scripts/start.sh
```

Or to bring up individual personas:

```sh
./scripts/start.sh [cust] [am]
```

To bring up a functioning chain, both {`cust`, `am`} should be running.

### Using the clients

If you now run `docker ps -a` or open the Docker Desktop dashboard you'll see there's four containers for each persona:

- React client e.g. `react-alice`
- API e.g. `api-alice`
- Substrate-based node e.g. `node-alice`
- IPFS node e.g. `ipfs-alice`

To view each persona's client in your browser, use the following ports:

- http://localhost:8001 for `customer`
- http://localhost:8002 for `additive manufacturer`

### Stopping the demo containers

You can knock down all instances with the following (argument is optional):

```sh
./scripts/stop.sh [all]
```

Or stop individual personas:

```sh
./scripts/stop.sh [cust] [am]
```

### Resetting the blockchain state

Reset the state of the blockchain and IPFS node with the following (argument is optional):

```sh
./scripts/reset.sh [all]
```

Or run reset for individual personas:

```sh
./scripts/reset.sh [cust] [am]
```

Where all arguments are optional.

### Checkpointing and restoring node state

Two scripts exist which can be used for checkpointing a blockchain node. Note this will not checkpoint an IPFS node. First to checkpoint a node for a given persona run:

```sh
./scripts/checkpoint.sh [cust|am] [DIR]
```

Where one of {`cust`, `am`} must be provided as the first argument and `DIR` is a path to the backup destination. The script will manage the lifecycle of the node and take a backup of the node state.

To restore a backup similarly run:

```sh
./scripts/restore.sh [cust|am] [DIR]
```

### Managing chain connections

The final two scripts [`disconnect.sh`](scripts/disconnect.sh) and [`connect.sh`](scripts/connect.sh) allow the substrate node for the `cust` or `am` to be disconnected from the others. To disconnect a node from the `chain` run

```sh
./scripts/disconnect.sh [cust|am]
```

And to reconnect run:

```sh
./scripts/connect.sh [cust|am]
```

This is generally used when [demoing network incorruptibility](#Demoing-Network-Incorruptibility).

## Demoing Network Resilience

The goal of this demo is to specifically show that data is redundant and the network will cope with those changes. This would normally take place after a substantial amount of demoing has been done so there is plenty of state in the chain. You should have the core personas up (`cust` and `am`) and you should have the ability to conduct changes whilst a persona is down, such that they will then be replicated. As such the following scenario is recommended:

> In our story the customer has placed an order with the additive manufacturer and they have accepted it. After that though the customer suffers a catastrophic IT failure and loses all of their system data. They have to rebuild their system from scratch.
>
> Meanwhile the additive manufacturer has the part built. The system works as though nothing has happened to the customer and is resilient.
>
> The customer brings up their blockchain and sees all the data restore; they lose nothing

To start this demo we assume that the `cust` and `am` personas are running. The following technical steps are then required:

1. In the browser:
   - `cust` creates an order
   - `am` approves the order
2. [Stop](#Bringing-up-the-demo-containers) the `cust` persona
3. [Reset](#Resetting-the-blockchain-state) the `cust` persona
4. In the browser
   - `am` send the order for manufacture
5. [Start](#Bringing-up-the-demo-containers) the `cust` persona
6. In the browser demonstrate that the customer persona has all the relevant data

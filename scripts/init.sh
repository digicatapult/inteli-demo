#!/bin/sh

PORTNODE=9933;
PORTIPFS=5001;
PORTAPI=3001;
TOKEN="";

get_token() {
	echo GetToken;
	HOST=$1;
	PORT=$2;
	URL=http://${HOST}:${PORT}/v2/auth;
	DATA='{"client_id": "'${REACT_API_AUTH_CLIENT_ID}'", "client_secret": "'${REACT_API_AUTH_CLIENT_SECRET}'"}';
	TOKEN=$(curl -X POST -H 'content-type: application/json' -d "$DATA" $URL 2>/dev/null | sed "s/{.*\"access_token\":\"\([^\"]*\).*}/\1/g");
}

init_data_with_curl() {
	echo InjectingDataWithCURL;
	HOST=$1;
	PORT=$2;
	URL=http://${HOST}:${PORT}/v2/run-process; # URL=http://localhost:3001/v2/run-process;
	OWNER=$3;
	REQ00='{"inputs":[],"outputs":[{ "roles": { "Owner": "'${OWNER}'" }, "metadata": '${POWDER0}' }]}';
	REQ01='{"inputs":[],"outputs":[{ "roles": { "Owner": "'${OWNER}'" }, "metadata": '${POWDER1}' }]}';
	REQ02='{"inputs":[],"outputs":[{ "roles": { "Owner": "'${OWNER}'" }, "metadata": '${POWDER2}' }]}';
	H1="Accept: application/json"
	H2="Authorization: Bearer ${TOKEN}"
	curl -X POST -H "$H1" -H "$H2" -F "request=${REQ00}" $URL; echo;
	curl -X POST -H "$H1" -H "$H2" -F "request=${REQ01}" $URL; echo;
	curl -X POST -H "$H1" -H "$H2" -F "request=${REQ02}" $URL; echo;
}

check_data_with_curl() {
	echo CheckingDataWithCURL;
	HOST=$1;
	PORT=$2;
	URL1=http://${HOST}:${PORT}/v2/item/1;
	URL2=http://${HOST}:${PORT}/v2/item/2;
	URL3=http://${HOST}:${PORT}/v2/item/3;
	H1="Accept: application/json"
	H2="Authorization: Bearer ${TOKEN}"
	curl -H "$H1" -H "$H2" $URL1; echo;
	curl -H "$H1" -H "$H2" $URL2; echo;
	curl -H "$H1" -H "$H2" $URL3; echo;
}


POWDER0=$(cat <<-END
{
	"type": { "type": "LITERAL", "value": "POWDER" },
	"powderReference": { "type": "LITERAL", "value": "MB000042" },
	"material": { "type": "LITERAL", "value": "Aluminium" },
	"alloy": { "type": "LITERAL", "value": "2014" },
	"quantityKg": { "type": "LITERAL", "value": "200" },
	"particleSizeUm": { "type": "LITERAL", "value": "37.4" },
	"location": { "type": "LITERAL", "value": "Powder Room" }
}
END
)

POWDER1=$(cat <<-END
{
	"type": { "type": "LITERAL", "value": "POWDER" },
	"powderReference": { "type": "LITERAL", "value": "MB000055" },
	"material": { "type": "LITERAL", "value": "Titanium" },
	"alloy": { "type": "LITERAL", "value": "Ti-6Al-4V" },
	"quantityKg": { "type": "LITERAL", "value": "200" },
	"particleSizeUm": { "type": "LITERAL", "value": "37.4" },
	"location": { "type": "LITERAL", "value": "Powder Room" }
}
END
)

POWDER2=$(cat <<-END
{
	"type": { "type": "LITERAL", "value": "POWDER" },
	"powderReference": { "type": "LITERAL", "value": "MB000056" },
	"material": { "type": "LITERAL", "value": "Titanium" },
	"alloy": { "type": "LITERAL", "value": "Ti-6Al-4V" },
	"quantityKg": { "type": "LITERAL", "value": "100" },
	"particleSizeUm": { "type": "LITERAL", "value": "37.4" },
	"location": { "type": "LITERAL", "value": "Powder Room" }
}
END
)

source .env;
OWNER=5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty;
get_token localhost $PORTAPI;
init_data_with_curl localhost $PORTAPI $OWNER;
check_data_with_curl localhost $PORTAPI;

echo Done;

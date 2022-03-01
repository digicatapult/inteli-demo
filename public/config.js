let config = {
  "authDomain": "inteli.eu.auth0.com",
  "clientID": "A5PgyCfBMIOhHQEIyImtqLGuD1VJ9VgP",
  "custAuthClientID": "BvJaBbxOce4Pwi5PZpjBTStvNWwzugPd",
  "t1AuthClientID": "6NfUcA48JdhKXYCc9yGTwM2m1gzcjOTU",
  "authAudience": "inteli-dev",
  "apiHost": "localhost",
  "apiPort": "3000",
  "substrateHost": "localhost",
  "substratePort": "9944",
  "vitalamDemoPersona": "cust",
}

if (!Window.config) {
  Window.config = {}
}

if (!Window.config.inteli) {
  Window.config.inteli = {}
}

for (const [key, value] of Object.entries(config)) {
  Window.config.inteli[key] = value
}

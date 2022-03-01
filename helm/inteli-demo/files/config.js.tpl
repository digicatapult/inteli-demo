let config = {{ $.Values.config.applicationConfig | toJson }}
  
  if (!Window.config) {
    Window.config = {}
  }
  
  if (!Window.config.inteli) {
    Window.config.inteli = {}
  }
  
  for (const [key, value] of Object.entries(config)) {
    Window.config.inteli[key] = value
  }
  
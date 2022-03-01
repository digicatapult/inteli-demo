export const saveState = (state, name) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(name, serialized)
  } catch (e) {
    console.error('Error occured while saving state', e)
  }
}

export const loadState = (key) => {
  try {
    const state = localStorage.getItem(key)
    return state ? JSON.parse(state) : {}
  } catch (e) {
    console.error('Error occured while preloading state', e)
    return {}
  }
}

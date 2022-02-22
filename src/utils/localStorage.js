export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.error('Error occured while reading from local storage:', e)
  }
}

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    return !serializedState ? {} : JSON.parse(serializedState)
  } catch (e) {
    console.error('Error reading state from local storage: ', e)
    return {}
  }
}

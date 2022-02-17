export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(e) {
    console.error(e)
  }
}

export const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e)
    return {};
  }
}; 
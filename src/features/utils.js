// a helper map for extraReducers to add all possible state handles
// this should be quite general as we returning new data along with some statuses
export const PromiseStateFactory = [
  ({ addCase }, fn) =>
    addCase(fn['fulfilled'], (state, { payload }) => ({
      ...state,
      ...payload,
      isFetching: false,
      isError: false,
    })),
  ({ addCase }, fn) =>
    addCase(fn['pending'], (state) => ({
      ...state,
      isFetching: true,
      isError: false,
    })),
  ({ addCase }, fn) =>
    addCase(fn['rejected'], (state, err) => ({
      ...state,
      isFetching: false,
      isError: err,
    })),
]

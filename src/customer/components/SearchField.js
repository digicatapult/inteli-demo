import React from 'react'
import TextField from '@material-ui/core/TextField'

const SearchField = ({ handleChange }) => {
  return (
    <TextField
      placeholder="Search by name, partId, material or alloy..."
      onChange={handleChange}
      fullWidth
      name="customerSearchPart"
    />
  )
}

export default SearchField

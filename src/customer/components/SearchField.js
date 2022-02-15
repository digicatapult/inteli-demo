import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const SearchField = ({ handleChange }) => {
  return (
    <Wrapper>
      <TextField
        id="standard-full-width"
        placeholder="Search by name, partId, material or alloy..."
        fullWidth
        onChange={handleChange}
        name="customerSearchPart"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 8px 0px;
  width: 625px;
`

export default SearchField

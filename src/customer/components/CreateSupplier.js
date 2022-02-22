import React from 'react'
import { Grid, Paper, Typography, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { FormControl, MenuItem, Select } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
    minHeight: '640px',
  },
  companyNameByLabel: {
    margin: '12px 0px 12px 0px',
    fontWeight: '600',
  },
  companyNameByInput: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    padding: '4px 16px',
    width: '70%',
    marginBottom: '40px',
  },
  companyTierByInput: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    padding: '4px 16px',
    width: '223px',
    marginBottom: '40px',
  },
  companyNameByTierLabel: {
    margin: '12px 0px 12px 0px',
    fontWeight: '600',
  },
  containerBorder: {
    paddingLeft: '35px',
    paddingTop: '35px',
  },
})

const CreateSupplier = () => {
  const classes = useStyles()
  const [tier, setTier] = React.useState('tier1')

  const handleChange = (event) => {
    setTier(event.target.value)
  }

  return (
    <Paper elevation={0} xs={12} className={classes.container}>
      <Grid justifyContent="center">
        <Grid item xs={6} className={classes.containerBorder}>
          <Grid item>
            <Typography
              variant="subtitle1"
              className={classes.companyNameByLabel}
            >
              Company name
            </Typography>
            <TextField
              type="text"
              className={classes.companyNameByInput}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              className={classes.companyNameByTierLabel}
            >
              Supplier tier
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 170, border: 'none' }}>
              <Select
                displayEmpty
                inputProps={{
                  'aria-label': 'Without label',
                  disableUnderline: true,
                }}
                className={classes.companyTierByInput}
                value={tier}
                onChange={handleChange}
              >
                <MenuItem value={'tier1'}>Tier 1</MenuItem>
                <MenuItem value={'tier2'}>Tier 2</MenuItem>
                <MenuItem value={'tier3'}>Tier 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CreateSupplier

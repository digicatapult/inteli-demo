import React from 'react'
import { Grid, Paper, Typography, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { FormControl, MenuItem, Select, Button } from '@material-ui/core'

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
  createSupplierButton: {
    backgroundColor: '#17AE93',
    color: '#fff',
    width: '290px',
    marginBottom: '15px',
    marginTop: '200px',
  },
  addressText: {
    border: '1px #d3d3d3 solid',
    borderRadius: '10px',
    padding: '4px 16px',
    width: '70%',
    marginBottom: '20px',
  },
})

const CreateSupplier = () => {
  const classes = useStyles()
  const [tier, setTier] = React.useState('tier1')
  const [country, setCountry] = React.useState('UK')

  const handleChange = (event) => {
    setTier(event.target.value)
  }
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <Paper elevation={0} xs={12} className={classes.container}>
      <Grid container justifyContent="center" xs={12}>
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
            <Grid item>
              <Typography
                variant="subtitle1"
                className={classes.companyNameByTierLabel}
              >
                SC10 certification
              </Typography>
              DROPZONE
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="medium"
                /*                 onClick={isAccepting ? null : onSubmit}
                 */ className={classes.createSupplierButton}
              >
                Create Supplier
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.containerBorder}>
          <Typography
            variant="subtitle1"
            className={classes.companyNameByLabel}
          >
            Company address
          </Typography>
          <TextField
            type="text"
            className={classes.addressText}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <TextField
            type="text"
            className={classes.addressText}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 170, border: 'none' }}>
            <Select
              displayEmpty
              inputProps={{
                'aria-label': 'Without label',
                disableUnderline: true,
              }}
              className={classes.addressText}
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value={'UK'}>United Kingdom</MenuItem>
              <MenuItem value={'FR'}>France</MenuItem>
              <MenuItem value={'DE'}>Germany</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default CreateSupplier

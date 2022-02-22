import moment from 'moment'

const DATE_PICKER_DATE_FORMAT = 'YYYY-MM-DD'

const isQuantityInvalid = (value, maxValue = Infinity) => {
  if (!isNaN(value) && parseInt(value, 10) > maxValue) {
    return 'Must be less than order'
  } else if (!isNaN(value) && parseInt(value, 10) < 1) {
    return 'More than 0'
  } else if (value === '') {
    return 'Must be a number'
  } else {
    return ''
  }
}

const isDeliveryByInvalid = (value) => {
  const date = moment(value, DATE_PICKER_DATE_FORMAT)

  if (!date.isValid()) {
    return 'Invalid date (dd/mm/yyyy)'
  } else if (date.isValid() && date.isBefore(moment().startOf('day'))) {
    return 'Not before today'
  } else {
    return ''
  }
}

export { DATE_PICKER_DATE_FORMAT, isQuantityInvalid, isDeliveryByInvalid }

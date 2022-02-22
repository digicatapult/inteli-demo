import moment from 'moment'

import { orderStatus, statusLabels } from './statuses'
import { DATE_PICKER_DATE_FORMAT } from './forms'

const getTimelineStatusIndex = (status) => {
  switch (status) {
    case orderStatus.submitted:
      return 1
    case orderStatus.amended:
      return 2
    case orderStatus.accepted:
      return 3
    case orderStatus.manufacturing:
      return 4
    case orderStatus.manufactured:
      return 5
  }
}

const getStatusLabel = (orderStatus) => {
  return statusLabels[orderStatus]
}

const getTokenTimestampFormattedDate = (timestamp) => {
  if (timestamp) {
    return moment(timestamp).format('DD-MM-YYYY HH:mm')
  }
}

const getAmendedDeliveryByFormattedDate = (deliveryBy) =>
  moment(deliveryBy, DATE_PICKER_DATE_FORMAT).format('DD - MM - YYYY')

export {
  getTimelineStatusIndex,
  getStatusLabel,
  getTokenTimestampFormattedDate,
  getAmendedDeliveryByFormattedDate,
}

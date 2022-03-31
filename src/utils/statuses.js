const orderStatus = {
  submitted: 'submitted',
  amended: 'amended',
  accepted: 'accepted',
  manufacturing: 'manufacturing',
  manufactured: 'manufactured',
}

const statusLabels = {
  [orderStatus.submitted]: 'Order placed',
  [orderStatus.amended]: 'Order negotiated',
  [orderStatus.accepted]: 'Certification',
  [orderStatus.manufacturing]: 'Dispatched',
  [orderStatus.manufactured]: 'Delivered',
}

export { orderStatus, statusLabels }

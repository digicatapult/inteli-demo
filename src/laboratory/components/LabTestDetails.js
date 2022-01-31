import React, { useState } from 'react'

import LabTestDetailsEdit from './LabTestDetailsEdit'
import LabTestDetailsOverview from './LabTestDetailsOverview'

const LabTestDetails = (props) => {
  const {
    id,
    metadata: {
      powderReference,
      requiredTests,
      overallResult,
      testReason,
      testReport,
    },
  } = props
  const [isEditMode, setIsEditMode] = useState(false)
  return !isEditMode ? (
    <LabTestDetailsOverview
      id={id}
      powderReference={powderReference}
      requiredTests={requiredTests}
      overallResult={overallResult}
      testReason={testReason}
      testReport={testReport}
      changeIsEditMode={() => setIsEditMode(true)}
    />
  ) : (
    <LabTestDetailsEdit id={id} />
  )
}

export default LabTestDetails

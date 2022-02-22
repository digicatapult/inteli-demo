import { metadataTypes } from './index'

const filesToMetadata = (files) => {
  return Object.entries(files).reduce((obj, [metadataKey, value]) => {
    return {
      ...obj,
      [metadataKey]: { fileName: value.fileName, url: value.url },
    }
  }, {})
}

const nonesToMetadata = (nones) => {
  return nones.reduce((obj, metadataKey) => {
    return {
      ...obj,
      [metadataKey]: '',
    }
  }, {})
}

const literalsToFormData = (literals) => {
  return Object.entries(literals).reduce((obj, [metadataKey, value]) => {
    return {
      ...obj,
      [metadataKey]: { type: metadataTypes.literal, value: value },
    }
  }, {})
}

const tokenIdsToFormData = (tokenIds) => {
  return Object.entries(tokenIds).reduce((obj, [metadataKey, value]) => {
    return {
      ...obj,
      [metadataKey]: { type: metadataTypes.tokenId, value: value },
    }
  }, {})
}

const nonesToFormData = (nones) => {
  return nones.reduce((obj, metadataKey) => {
    return {
      ...obj,
      [metadataKey]: { type: metadataTypes.none },
    }
  }, {})
}

const filesToFormData = (files) => {
  return Object.entries(files).reduce((obj, [metadataKey, value]) => {
    return {
      ...obj,
      [metadataKey]: { type: metadataTypes.file, value: value.fileName },
    }
  }, {})
}

const createOutput = ({
  roles,
  metadata: { files = {}, literals = {}, tokenIds = {}, nones = {} },
  parentIndex,
}) => {
  return {
    metadata: {
      ...filesToMetadata(files),
      ...literals,
      ...tokenIds,
      ...nonesToMetadata(nones),
    },
    output: {
      roles,
      metadata: {
        ...filesToFormData(files),
        ...literalsToFormData(literals),
        ...tokenIdsToFormData(tokenIds),
        ...nonesToFormData(nones),
      },
      parent_index: parentIndex,
    },
  }
}

const request = ({ inputs = [], outputs, filesToAttach }) => {
  const formData = new FormData()

  if (filesToAttach) {
    for (const value of Object.values(filesToAttach)) {
      formData.append('files', value.blob, value.fileName)
    }
  }

  formData.set(
    'request',
    JSON.stringify({
      inputs,
      outputs,
    })
  )

  return formData
}

export { request, createOutput }

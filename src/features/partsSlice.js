import { createSlice } from '@reduxjs/toolkit'
import images from '../images'

const requiredCerts = [
  { metadataKey: 'signedPo', description: 'Signed PO' },
  {
    metadataKey: 'chemComp',
    description: 'Chemical composition analysis by spectrophotometry',
  },
  {
    metadataKey: 'tensionTest',
    description: 'Test methods for tension testing of metallic materials',
  },
  {
    metadataKey: 'particleSizeLight',
    description: 'Particle size distribution by light scattering',
  },
  {
    metadataKey: 'particleSizeImage',
    description: 'Particle size analysis by image analysis methods',
  },
  {
    metadataKey: 'contaminationPercent',
    description: 'Determining the percentage of contamination of powder',
  },
  {
    metadataKey: 'carneyFunnel',
    description: 'Density of non-free-flowing powders using the carney funnel',
  },
  {
    metadataKey: 'inertGasFusion',
    description: 'Determination of oxygen and nitrogen by Inert gas fusion',
  },
]

export const partsSlice = createSlice({
  name: 'customerParts',
  initialState: [
    {
      partId: '34-396589-2',
      name: 'Low-pressure compressor',
      image: images.parts[0],
      material: 'Titanium',
      alloy: 'Ti-6Al-4V',
      price: 1200,
      requiredCerts,
    },
    {
      partId: '10-631045-1',
      name: 'Engine fan blades',
      image: images.parts[1],
      material: 'Aluminium',
      alloy: '2014',
      price: 750,
      requiredCerts,
    },
    {
      partId: '11-219743-1',
      name: 'Axial turbine gearing',
      image: images.parts[2],
      material: 'Titanium',
      alloy: 'Ti-6Al-4V',
      price: 925,
      requiredCerts,
    },
    {
      partId: '12-367534-1',
      name: 'Impeller',
      image: images.parts[3],
      material: 'Aluminum',
      alloy: '2014',
      price: 2100,
      requiredCerts,
    },
    {
      partId: '10-874236-1',
      name: 'Combustion chamber',
      image: images.parts[4],
      material: 'Aluminium',
      alloy: '2014',
      price: 1828,
      requiredCerts,
    },
    {
      partId: '13-143583-2',
      name: 'Turbine disc',
      image: images.parts[5],
      material: 'Nickel',
      alloy: 'C-276',
      price: '552',
      requiredCerts,
    },
    {
      partId: '14-143463-1',
      name: 'Steering axle',
      image: images.parts[6],
      material: 'Steel',
      alloy: '304L',
      price: 680,
      requiredCerts,
    },
    {
      partId: '10-045623-3',
      name: 'Wing rib',
      image: images.parts[7],
      material: 'Aluminium',
      alloy: '2014',
      price: 3210,
      requiredCerts,
    },
  ],
  reducers: {
    getCustomerParts(state) {
      return state.customerParts
    },
  },
})

export const { actions, reducer } = partsSlice

export const { getCustomerParts } = actions

export default reducer

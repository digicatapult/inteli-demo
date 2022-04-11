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

const partIds = [
  '10-631045-1',
  '11-219743-1',
  '12-367534-1',
  '10-874236-1',
  '13-143583-2',
  '14-143463-1',
  '15-143463-1',
  '10-045623-3',
  '17-075673-3',
]

export const partsSlice = createSlice({
  name: 'customerParts',
  initialState: [
    {
      partId: partIds[0],
      name: 'Low-pressure compressor',
      image: images.parts[0],
      material: 'Titanium',
      alloy: 'Ti-6Al-4V',
      price: 1200,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[1],
      name: 'Engine fan blades',
      image: images.parts[1],
      material: 'Aluminium',
      alloy: '2014',
      price: 750,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[2],
      name: 'Axial turbine gearing',
      image: images.parts[2],
      material: 'Titanium',
      alloy: 'Ti-6Al-4V',
      price: 925,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[3],
      name: 'Impeller',
      image: images.parts[3],
      material: 'Aluminum',
      alloy: '2014',
      price: 2100,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[4],
      name: 'Combustion chamber',
      image: images.parts[4],
      material: 'Aluminium',
      alloy: '2014',
      price: 1828,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[5],
      name: 'Turbine disc',
      image: images.parts[5],
      material: 'Nickel',
      alloy: 'C-276',
      price: '552',
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[6],
      name: 'Canister',
      image: images.parts[6],
      material: 'Aluminium',
      alloy: '2014',
      price: '48',
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[7],
      name: 'Steering axle',
      image: images.parts[7],
      material: 'Steel',
      alloy: '304L',
      price: 680,
      requiredCerts,
      supplier: 'Maher',
    },
    {
      partId: partIds[8],
      name: 'Wing rib',
      image: images.parts[8],
      material: 'Aluminium',
      alloy: '2014',
      price: 3210,
      requiredCerts,
      supplier: 'Maher',
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

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 02/07/2020
//
// Version: 2.0.0-ol
////////////////////////////////////////////
/*

Handle the input layer z-Index through it type against the layers already
existing in the map.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigLayer } from './checkInputConfigLayer.js'
import { getActiveMap } from '../modules/getActiveMap.js'
import { getMapLayers } from '../modules/getMapLayers.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {string}  inputConfig.layer   The input layer to handle.
 * @param {object}  inputConfig.map     The active map.
 *
 * @example
 * handleLayers({
 *   layer: 'input',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const handleLayers = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the new layer to handle */
  const layer = inputConfig.layer

  /** Check if the layer is defined. If not, end the function */
  if (!layer) return

  /** Get the list of the active map layers */
  const layerList = getMapLayers({ map: map })

  const sortedLayerList = layerList.sort((a, b) => {
    return a.getZIndex() > b.getZIndex()
      ? 1
      : b.getZIndex() > a.getZIndex()
      ? -1
      : 0
  })
  const layerCount = sortedLayerList.length

  if (layerCount === 1) {
    layer.setZIndex(0)
  } else if (layerCount > 1) {
    /** Get the type and category of the layer to handle */
    const layerType = layer.getProperties().layerProperties.type
    const layerCategory = layer.getProperties().layerProperties.category

    if (layerType === 'vector') {
      layer.setZIndex(layerCount - 1)
    } else if (layerType === 'raster') {
      switch (layerCategory) {
        case 'basemap':
          setBasemapIndex(sortedLayerList, layerCount, layer)
          break
        case 'wms':
          setWmsIndex(sortedLayerList, layerCount, layer)
          break
        case 'image':
          setImageIndex(sortedLayerList, layerCount, layer)
          break
      }
    }
  }
}

/** METHODS */
const countLayerByType = (layerList, layerType) => {
  /** Check if layerType and layerList exists */
  if (!layerType || !layerList) return

  let layerCount = 0

  layerList.forEach(layer => {
    if (layer.getProperties().layerProperties.category === layerType) {
      layerCount += 1
    }
  })

  return layerCount
}

const setBasemapIndex = (layerList, layerCount, layer) => {
  /** Get the number of loaded basemaps */
  const basemapCount = countLayerByType(layerList, 'basemap')

  /** Get the index for the new layer */
  const zIndex = basemapCount - 1

  /** Set the new index value */
  layer.setZIndex(zIndex)

  layerList.forEach(layer => {
    if (layer.getProperties().layerProperties.category != 'basemap') {
      layer.setZIndex(layer.getZIndex() + 1)
    }
  })
}

const setWmsIndex = (layerList, layerCount, layer) => {
  /** Get the number of loaded basemaps */
  const basemapCount = countLayerByType(layerList, 'basemap')

  /** Get the number of loaded WMS services */
  const wmsCount = countLayerByType(layerList, 'wms')

  /** Get the index for the new layer */
  const zIndex = basemapCount + wmsCount - 1

  /** Set the new index value */
  layer.setZIndex(zIndex)

  layerList.forEach(layer => {
    if (
      layer.getProperties().layerProperties.category != 'basemap' &&
      layer.getProperties().layerProperties.category != 'wms'
    ) {
      layer.setZIndex(layer.getZIndex() + 1)
    }
  })
}

const setImageIndex = (layerList, layerCount, layer) => {
  /** Get the number of loaded basemaps */
  const basemapCount = countLayerByType(layerList, 'basemap')

  /** Get the number of loaded WMS services */
  const wmsCount = countLayerByType(layerList, 'wms')

  /** Get the number of loaded WMS services */
  const imageCount = countLayerByType(layerList, 'image')

  /** Get the index for the new layer */
  const zIndex = basemapCount + wmsCount + imageCount - 1

  /** Set the new index value */
  layer.setZIndex(zIndex)

  layerList.forEach(layer => {
    if (
      layer.getProperties().layerProperties.category != 'basemap' &&
      layer.getProperties().layerProperties.category != 'wms' &&
      layer.getProperties().layerProperties.category != 'image'
    ) {
      layer.setZIndex(layer.getZIndex() + 1)
    }
  })
}

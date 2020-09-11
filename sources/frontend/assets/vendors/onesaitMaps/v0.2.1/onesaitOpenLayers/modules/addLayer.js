////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 09/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Adds a layer to the map, handling previously the zIndex value of the layer.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigLayer } from '../modules/checkInputConfigLayer.js'
import { getActiveMap } from './getActiveMap.js'
import { handleLayers } from './handleLayers.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {object}  inputConfig.layer   The layer to add to the map.
 * @param {object}  inputConfig.map     The active map.
 *
 * @example
 * addLayer({
 *   layer: vectorLayer,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const addLayer = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** If no layer is defined, stop the function */
  if (!layer) return

  /** Add the layer to the current map */
  map.addLayer(layer)

  /** Handle the zIndex of the layer */
  handleLayers({ layer: layer, map: map })

  /** CHECKER */
  // const layerList = getMapLayers()
  // const sortedLayerList = layerList.sort((a, b) => {
  // 	return a.getZIndex() > b.getZIndex()
  // 		? 1
  // 		: b.getZIndex() > a.getZIndex()
  // 		? -1
  // 		: 0
  // })
  // const counter = sortedLayerList.length
  // console.log('Número de capas: ' + counter)

  // sortedLayerList.forEach((layer) => {
  // 	const layerName = layer.getProperties().layerProperties.label
  // 	const layerIndex = layer.getZIndex()

  // 	console.log(layerIndex + ' - ' + layerName)
  // })

  // console.log('-------------------------------')
}

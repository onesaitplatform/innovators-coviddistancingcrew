////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 19/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Remove the input layer from the map

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigLayer } from './checkInputConfigLayer.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {object}  inputConfig.layer   The layer to remove to the map.
 * @param {object}  inputConfig.map     The active map.
 *
 * @example
 * removeMapLayer({
 *   layer: map.getLayers().getArray()[0],
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const removeMapLayer = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** Check if the layer has been defined. If not, end the method */
  if (!layer) return

  map.removeLayer(layer)
}

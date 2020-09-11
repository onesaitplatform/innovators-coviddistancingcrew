////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 13/07/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Return a layer from the active map by it name or label properties. If the layer
is not founded, it will return an undefined.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigString } from '../../common/modules/checkInputConfigProperties.js'

import { getActiveMap } from './getActiveMap.js'
import { getMapLayers } from './getMapLayers.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {string}  inputConfig.label   The layer label to identify.
 * @param {string}  inputConfig.name    The layer name to identify.
 * @param {object}  inputConfig.map     The active map.
 *
 * @return {object|undefined}   The layer you are looking for.
 *
 * @example
 * getMapLayerByName({
 *   label: 'Capa de puntos bonitos',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapLayerByName = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the list of the active map layers */
  const layerList = getMapLayers({ map: map })

  /** Check if there are any layers */
  if (!layerList || layerList.length === 0) return

  /** Get the label and name properties */
  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : undefined

  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : undefined

  if (!label && !name) return

  /** Set a variable to store the layer */
  let selectedLayer

  layerList.forEach(layer => {
    if (
      (label && layer.getProperties().layerProperties.label === label) ||
      (name && layer.getProperties().layerProperties.name === name)
    ) {
      selectedLayer = layer
    }
  })

  /** Return the selected layer, if founded */
  return selectedLayer
}

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 10/07/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

This method will return a map interaction in case that the provided name is the
same as the interaction name.

*/
////////////////////////////////////////////
/** Import the necessary libraries */
import { checkInputConfigString } from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig        The input parameters object.
 * @param {string}  inputConfig.name   The name of the controller to select.
 * @param {object}  inputConfig.map    The active map.
 *
 * @return {object|undefined}   Returns a map controller or undefined.
 *
 * @example
 * getMapInteractionByName({
 *   name: 'selectInteraction',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapInteractionByName = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the layers */
  const interactionLists = map.getInteractions().getArray()

  /** Check if there are any layers */
  if (interactionLists.length === 0) return

  /** Get the name of the interaction */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : undefined

  /** Check if the name is defined. If not, end the function */
  if (!name) return

  /** Set a variable to store the layer */
  let selectedInteraction

  /** Iterate all the map interactions and look for the searched one */
  interactionLists.forEach(layer => {
    if (
      layer.getProperties().hasOwnProperty('interactionProperties') &&
      layer.getProperties().interactionProperties.name === name
    ) {
      selectedInteraction = layer
    }
  })

  /** Return the selected layer, if founded */
  return selectedInteraction
}

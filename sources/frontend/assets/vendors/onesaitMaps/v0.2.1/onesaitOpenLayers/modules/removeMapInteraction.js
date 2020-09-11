////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 19/08/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Remove the input interaction from the map

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigObject } from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig               The input parameters object.
 * @param {object}  inputConfig.interaction   The interaction to remove from the map.
 * @param {object}  inputConfig.map           The active map.
 *
 * @example
 * removeMapInteraction({
 *   interaction: map.getInteractions().getArray()[9],
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const removeMapInteraction = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the interaction to remove */
  const interaction = checkInputConfigObject(inputConfig, 'interaction')
    ? inputConfig.interaction
    : undefined

  /** Check if the interaction has been defined. If not, end the method */
  if (!interaction) return

  /** Remove the interaction */
  map.removeInteraction(interaction)
}

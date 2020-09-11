////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 19/08/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Remove the input control from the map

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigObject } from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig              The input parameters object.
 * @param {object}  inputConfig.controller   The interaction to remove from the map.
 * @param {object}  inputConfig.map          The active map.
 *
 * @example
 * removeMapController({
 *   controller: map.getInteractions().getArray()[9],
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const removeMapController = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the control to remove */
  const controller = checkInputConfigObject(inputConfig, 'controller')
    ? inputConfig.controller
    : undefined

  /** Check if the control has been defined. If not, end the method */
  if (!controller) return

  /** Remove the control */
  map.removeControl(controller)
}

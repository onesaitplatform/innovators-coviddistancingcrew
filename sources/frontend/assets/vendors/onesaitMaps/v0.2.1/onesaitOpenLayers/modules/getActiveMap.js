////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 08/06/2020
// Updated on: 17/06/2020
//
// Version: 1.1.0-ol
////////////////////////////////////////////
/*

Return the active map to use. It will check if the inputConfig object have a 
property called 'map', it exists and is a valid OpenLayers map container.

Returns the inputConfig.map if is a valid map, and the first map of the map list
if the map container doesn't exist, is empty or is not a valid one.

////////////////////////////////////////////

Version 1.1.0 notes
 - Now is not necessary to check if the inputConfig exists, so the input param
   is now the proper inputConfig.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { onesaitOpenLayers } from '../../onesaitOpenLayers/onesaitOpenLayers.js'

/**
 *
 * @param {object}  inputConfig   The inputConfig to check with the map property.
 *
 * @return {object}  Returns a map container.
 *
 * @example
 * getActiveMap(inputConfig)
 */
export const getActiveMap = inputConfig => {
  return inputConfig &&
    inputConfig.hasOwnProperty('map') &&
    inputConfig.map &&
    inputConfig.map.hasOwnProperty('ol_uid') &&
    typeof inputConfig.map.ol_uid !== 'undefined'
    ? inputConfig.map
    : onesaitOpenLayers.management.maps[0]
}

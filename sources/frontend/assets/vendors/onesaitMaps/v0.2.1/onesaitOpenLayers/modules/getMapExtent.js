////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 22/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Get the extent of the current active map.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultExtentValue } from '../../common/defaultConfig/defaultConfig.js'
import { checkInputConfigString } from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig        The input parameters object.
 * @param {string}  inputConfig.epsg   The projection format in which return the extent.
 * @param {object}  inputConfig.map    The active map.
 *
 * @return {object|undefined}   Return the list of coordinates of the extent or undefined.
 *
 * @example
 * getMapExtent({
 *   epsg: 'EPSG:3857',
 *   map: onesaitOpenLayers.management.maps[1]
 * })
 */
export const getMapExtent = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the output projection */
  const epsg = checkInputConfigString(inputConfig, 'epsg')
    ? inputConfig.epsg
    : defaultExtentValue.epsg

  /** Return the extent considering the projection */
  return epsg === 'EPSG:4326'
    ? ol.proj.transformExtent(
        map.getView().calculateExtent(map.getSize()),
        'EPSG:3857',
        'EPSG:4326'
      )
    : map.getView().calculateExtent(map.getSize())
}

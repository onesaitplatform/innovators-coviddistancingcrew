////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 10/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Get the map controller through it name.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
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
 * getMapControllerByName({
 *   name: 'mouse-position-controller',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapControllerByName = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the controller name */
  const name =
    inputConfig &&
    inputConfig.hasOwnProperty('name') &&
    typeof inputConfig.name === 'string' &&
    inputConfig.name.length > 0
      ? inputConfig.name
      : undefined

  /** If no controller name is defined, end the function */
  if (!name) return

  /** Set a variable to store the controller */
  let controller

  /** Look for the controller through it name */
  if (map.controls.array_.length > 0) {
    map.controls.array_.forEach(control => {
      if (
        control.hasOwnProperty('values_') &&
        control.values_ &&
        control.values_.hasOwnProperty('name') &&
        control.values_.name &&
        control.values_.name === name
      ) {
        controller = control
      }
    })
  }

  return controller
}

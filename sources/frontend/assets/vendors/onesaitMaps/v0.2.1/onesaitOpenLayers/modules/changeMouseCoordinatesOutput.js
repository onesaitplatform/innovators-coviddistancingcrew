////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 10/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

This function handles a combobox controller where the user can select a
projection system (EPSG) to change the coordinates are displayed in a name
div.

The controller can be selected by itself using the 'controller' property, or
giving the controller name using the 'name' property to look for the
controller in the control list.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultMapCoordinates } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigArray,
  checkInputConfigDivId,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'
import { getMapControllerByName } from './getMapControllerByName.js'

/**
 *
 * @param {object}  inputConfig              The input parameters object.
 * @param {string}  inputConfig.selector     The ID of the combobox to select the EPSG.
 * @param {string}  inputConfig.name         The name of the controller that handle the mouse coordinates.
 * @param {string}  inputConfig.controller   The controller itself that handle the mouse coordinates.
 * @param {object}  inputConfig.map          The active map.
 *
 * @example
 * changeMouseCoordinatesOutput({
 *   selector: 'proj-rectangle-div',
 *   name: 'mouse-position-controller',
 *   controller: map.getControls().getArray()[1],
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const changeMouseCoordinatesOutput = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the div element through it ID */
  const selector = checkInputConfigDivId(inputConfig, 'selector')
    ? inputConfig.selector
    : undefined

  /** Check if the <div> has been detected */
  if (!selector) return

  /** Try to get the map controller that handle the mouse position */
  const controller = checkInputConfigArray(inputConfig, 'controller')
    ? inputConfig.controller
    : undefined

  /** Get the controller by it name */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : defaultMapCoordinates.name

  /** Get the mouse controller */
  const mouseController =
    controller || getMapControllerByName({ map: map, name: name })

  /** Check if the mouse controller has been found */
  if (!mouseController) return

  /** Get the selector through it div ID */
  const epsgDiv = document.getElementById(selector)

  /** Add an event listener to the selector changer */
  epsgDiv.addEventListener('change', event => {
    mouseController.setProjection(event.target.value)
  })
}

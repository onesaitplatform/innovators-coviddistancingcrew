////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 09/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Get the coordinates of the mouse over the map. Display the values inside the map
viewer (by default, at top-right side; change the CSS to move it) or send the
coordinates to a <div> using it ID.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultMapCoordinates } from '../../common/defaultConfig/defaultConfig.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig              The input parameters object.
 * @param {string}  inputConfig.id           The target div ID where to show the coordinates.
 * @param {string}  inputConfig.name   			 The name of the map controller.
 * @param {string}  inputConfig.epsg         The coordinate system to project the coordinates.
 * @param {number}  inputConfig.precision    The number of decimals in the coordinates output.
 * @param {string}  inputConfig.outMapText   The text that will appers when the mouse is out the map.
 * @param {object}  inputConfig.map          The active map.
 *
 * @example
 * setControlMouseCoordinates({
 *   id: 'mouse-position',
 *   name: 'mouse-position-controller',
 *   epsg: 'EPSG:4326',
 *   precision: 2,
 *   outMapText: 'empty',
 * })
 *
 */
export const setControlMouseCoordinates = inputConfig => {
  /** Check if the DIV ID is defined*/
  if (
    !inputConfig.hasOwnProperty('id') ||
    typeof inputConfig.id === 'undefined'
  )
    return

  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Set the name of the controller */
  const name =
    inputConfig &&
    inputConfig.hasOwnProperty('name') &&
    typeof inputConfig.name === 'string' &&
    inputConfig.name.length > 0
      ? inputConfig.name
      : defaultMapCoordinates.name

  /** Get the format to show the position */
  const epsg =
    inputConfig &&
    inputConfig.hasOwnProperty('epsg') &&
    typeof inputConfig.epsg === 'string' &&
    inputConfig.epsg.length > 0
      ? inputConfig.epsg
      : defaultMapCoordinates.epsg

  /** Set the precision of the coordinates (number of decimals to show) */
  const precision =
    inputConfig &&
    inputConfig.hasOwnProperty('precision') &&
    typeof inputConfig.precision === 'number' &&
    inputConfig.precision >= 0 &&
    inputConfig.precision < 8
      ? inputConfig.precision
      : defaultMapCoordinates.precision

  /** Get the out of map text */
  const outMapText =
    inputConfig &&
    inputConfig.hasOwnProperty('outMapText') &&
    inputConfig.outMapText &&
    typeof inputConfig.outMapText === 'string'
      ? inputConfig.outMapText
      : defaultMapCoordinates.outMapText

  /** Set the mouse controller options */
  let mouseControllerOptions = {
    coordinateFormat: ol.coordinate.createStringXY(precision),
    projection: epsg,
    // TODO: analyze this:
    // displayProjection: epsg,
    undefinedHTML: outMapText
  }

  /** Check if the mouse controller will be send to another div or will be
   * showd inside the map div, at top-right by default. This position can be
   * changed later with CSS */
  if (
    inputConfig &&
    inputConfig.hasOwnProperty('id') &&
    inputConfig.id &&
    document.getElementById(inputConfig.id)
  ) {
    mouseControllerOptions.className = 'custom-mouse-position'
    mouseControllerOptions.target = document.getElementById(inputConfig.id)
  }

  /** Set the mouse controller */
  let mouseController = new ol.control.MousePosition(mouseControllerOptions)

  /** Add a new property with the controller name */
  mouseController.set('name', name)

  /** Add the controller to the map */
  map.addControl(mouseController)
}

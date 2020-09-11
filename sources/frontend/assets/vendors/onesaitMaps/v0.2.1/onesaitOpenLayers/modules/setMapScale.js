////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 29/06/2020
//
// Version: 0.1.0-ol
////////////////////////////////////////////
/*

Set the graphic and/or text scale

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultMapScale } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigBoolean,
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}   inputConfig             The input parameters object.
 * @param {string}   inputConfig.id   		   The ID of the DIV to show the scale.
 * @param {string}   inputConfig.name   		 The name of the map controller.
 * @param {number}   inputConfig.minWidth    The smaller width of the bar div.
 * @param {string}   inputConfig.units   		 The name of the map controller.
 * @param {boolean}  inputConfig.bar   		   Check if the graphic bar will appers.
 * @param {number}   inputConfig.steps   		 The number of steps in the graphic bar.
 * @param {number}   inputConfig.text   		 << To define >>
 * @param {string}   inputConfig.precision   The name of the map controller.
 * @param {object}   inputConfig.map         The active map.
 *
 * @example
 * setMapScale({
 *   id: 'mouse-position',
 *   name: 'mouse-position-controller',
 *   epsg: 'EPSG:4326',
 *   precision: 2,
 *   outMapText: 'empty',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 *
 */
export const setMapScale = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Set the name of the controller */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : defaultMapScale.name

  /** Set the minimum width of the bar */
  const minWidth = checkInputConfigNumber(inputConfig, 'minWidth')
    ? inputConfig.minWidth
    : defaultMapScale.minWidth

  /** Set units to show in the graphic scale */
  const units = checkInputConfigString(inputConfig, 'units')
    ? inputConfig.units
    : defaultMapScale.units

  /** Check if the graphic scale will be a scale bar */
  const bar = checkInputConfigBoolean(inputConfig, 'bar')
    ? inputConfig.bar
    : defaultMapScale.bar

  /** Set the number of steps in the scale bar (better use even values) */
  const steps = checkInputConfigBoolean(inputConfig, 'steps')
    ? inputConfig.steps
    : defaultMapScale.steps

  /** Check if the graphic scale will have a numeric scale; IDK why this only
   * works if the scalebar is enabled. Use CSS to hide useless graphics */
  const text = checkInputConfigBoolean(inputConfig, 'text')
    ? inputConfig.text
    : defaultMapScale.text

  /** Set the mouse controller options */
  let scaleControllerOptions = {
    minWidth: minWidth,
    units: units,
    bar: bar,
    steps: steps,
    text: text
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
    scaleControllerOptions.className = defaultMapScale.className
    scaleControllerOptions.target = document.getElementById(inputConfig.id)
  }

  /** Set the mouse controller */
  let scaleController = new ol.control.ScaleLine(scaleControllerOptions)

  /** Add a new property with the controller name */
  scaleController.set('name', name)

  map.addControl(scaleController)
}

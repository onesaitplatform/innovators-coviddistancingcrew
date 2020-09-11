////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 17/09/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Return the controls from the current map. If no map is choosen, it will return the
list of controls from the default map (#0).

If the input of 'filter' is fulfilled right, this will show show this particular
property of the controls:

 - 'name': it will return a list with the name of the controls.
 - 'controllerProperties': it will return the controls properties.
 - 'length': it will return the number of controls.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigString } from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}  inputConfig          The input parameters object.
 * @param {string}  inputConfig.filter   The info to show: properties and layer properties.
 * @param {object}  inputConfig.map      The active map.
 *
 * @return {object|undefined}
 *
 * @example
 * getMapControllers({
 *   filter: 'name',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapControllers = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Try to get the options to show */
  const filter = checkInputConfigString(inputConfig, 'filter')
    ? inputConfig.filter
    : undefined

  /** Get the layer list */
  const controllerList = map.getControls().getArray()

  /** Check if at least there is one controller */
  if (controllerList.length < 1) return

  /** Set a list to store the options to return */
  let list = []

  /** Check the content of the get; if empty, return the layers list */
  switch (filter) {
    case 'name':
      controllerList.forEach(controller => {
        if (controller.getProperties().hasOwnProperty('controllerProperties')) {
          list.push(controller.getProperties().controllerProperties.name)
        }
      })

      return list.length > 0 ? list : undefined

    case 'controllerProperties':
      controllerList.forEach(controller => {
        if (controller.getProperties().hasOwnProperty('controllerProperties')) {
          list.push(controller.getProperties().controllerProperties)
        }
      })
      return list.length > 0 ? list : undefined

    case 'length':
      return controllerList.length > 0 ? controllerList.length : 0

    default:
      /** Return the controllers */
      return controllerList.length > 0 ? controllerList : undefined
  }
}

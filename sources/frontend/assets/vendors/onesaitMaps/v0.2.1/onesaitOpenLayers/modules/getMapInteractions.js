////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 17/09/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Return the interactions from the current map. If no map is choosen, it will return
the list of interactions from the default map (#0).

If the input of 'filter' is fulfilled right, this will show this particular
property of the interactions:

 - 'name': it will return a list with the name of the interactions.
 - 'interactionProperties': it will return the interaction properties.
 - 'length': it will return the number of interactions.

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
 * @return {object|undefined}   Return the list of layers (or properties) or undefined.
 *
 * @example
 * getMapInteractions({
 *   filter: 'name',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapInteractions = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Try to get the options to show */
  const filter = checkInputConfigString(inputConfig, 'filter')
    ? inputConfig.filter
    : undefined

  /** Get the interactions list */
  const interactionList = map.getInteractions().getArray()

  /** Check if at least there is one controller */
  if (interactionList.length < 1) return

  /** Set a list to store the options to return */
  let list = []

  /** Check the content of the get; if empty, return the layers list */
  switch (filter) {
    case 'name':
      interactionList.forEach(interaction => {
        if (
          interaction.getProperties().hasOwnProperty('interactionProperties')
        ) {
          list.push(interaction.getProperties().interactionProperties.name)
        }
      })

      return list.length > 0 ? list : undefined

    case 'properties':
      interactionList.forEach(interaction => {
        if (
          interaction.getProperties().hasOwnProperty('interactionProperties')
        ) {
          list.push(interaction.getProperties().interactionProperties)
        }
      })
      return list.length > 0 ? list : undefined

    default:
      /** Return the controllers */
      return interactionList.length > 0 ? interactionList : undefined
  }
}

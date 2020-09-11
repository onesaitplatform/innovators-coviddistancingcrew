////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 19/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Return the layers from the current map. If no map is choosen, it will return the
list of layers from the default map (#0).

If the input of 'filter' is fulfilled right, this will show this particular
property of the layers:

 - 'name': it will return a list with the name of the layers.
 - 'label': it will return a list with the label of the layers.
 - 'properties': it will return a list with the properties of the layer object.
 - 'layerProperties': it will return the layer properties.
 - 'length': it will return the number of layers.

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
 * getMapLayers({
 *   filter: 'name',
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const getMapLayers = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Try to get the options to show */
  const filter = checkInputConfigString(inputConfig, 'filter')
    ? inputConfig.filter
    : undefined

  /** Get the list of the active map layers */
  const layerList = map.getLayers().getArray()

  /** Check if at least there is one layer. If not, return an empty array */
  if (layerList.length < 1) return []

  /** Set a list to store the options to return */
  let list = []

  /** Check the content of the get; if empty, it will return the layers list */
  switch (filter) {
    case 'name':
      layerList.forEach(layer => {
        if (layer.getProperties().hasOwnProperty('layerProperties')) {
          list.push(layer.getProperties().layerProperties.name)
        }
      })

      return list.length > 0 ? list : undefined

    case 'label':
      layerList.forEach(layer => {
        if (layer.getProperties().hasOwnProperty('layerProperties')) {
          list.push(layer.getProperties().layerProperties.label)
        }
      })

      return list.length > 0 ? list : undefined

    case 'properties':
      layerList.forEach(layer => {
        if (layer.getProperties().hasOwnProperty('layerProperties')) {
          list.push(layer.getProperties())
        }
      })

      return list.length > 0 ? list : undefined

    case 'layerProperties':
      layerList.forEach(layer => {
        if (layer.getProperties().hasOwnProperty('layerProperties')) {
          list.push(layer.getProperties().layerProperties)
        }
      })

      return list.length > 0 ? list : undefined

    case 'length':
      return layerList.length

    default:
      /** Return the layers if exists */
      return layerList.length > 0 ? layerList : []
  }
}

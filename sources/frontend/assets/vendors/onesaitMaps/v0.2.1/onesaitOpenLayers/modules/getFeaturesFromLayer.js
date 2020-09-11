////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 02/09/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Retrieve entities from a layer. If no entity is found, it will return undefined.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import {
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'
import { getMapLayerByName } from './getMapLayerByName.js'

/**
 *
 * @param {object}   inputConfig            The input parameters object.
 * @param {object}   inputConfig.layer      The targeted layer.
 * @param {object}   inputConfig.name       The target layer name.
 * @param {object}   inputConfig.label      The target layer label.
 * @param {string}   inputConfig.property   The property to evaluate.
 * @param {string}   inputConfig.value      The value to identify the entity.
 */
export const getFeaturesFromLayer = inputConfig => {
  /** Get the layer */
  let layer = checkInputConfigLayer(inputConfig) ? inputConfig.layer : undefined

  /** Try to get the name of the layer */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : undefined

  /** Try to get the label of the layer */
  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : undefined

  /** Check if the layer has not been defined AND name or label has been provided */
  if (!layer && (name || label)) {
    layer = getMapLayerByName({ name: name, label: label })
  }

  /** Get the property to evaluate */
  const property = checkInputConfigString(inputConfig, 'property')
    ? inputConfig.property
    : undefined

  /** Get the value to evaluate */
  const value =
    checkInputConfigString(inputConfig, 'value') ||
    checkInputConfigNumber(inputConfig, 'value')
      ? inputConfig.value
      : undefined

  /** Check if the layer and the query are undefined. If so, end the function */
  if (!layer || !property || !value) return

  const entities = []

  /** Iterate the entities of the layer */
  layer
    .getSource()
    .getFeatures()
    .forEach(entity => {
      /** Check if the entity has the property */
      if (
        entity.getProperties().hasOwnProperty(property) &&
        entity.getProperties()[property]
      ) {
        if (entity.getProperties()[property] === value) {
          entities.push(entity)
        }
      }
    })

  return entities
}

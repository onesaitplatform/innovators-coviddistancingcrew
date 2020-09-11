////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 19/06/2020
//
// Version: 0.1.0-ol
////////////////////////////////////////////
/*

Select features from the map, defining the type of selection, being available:
 - click
 - hover
 - dragBox

If no input parameters are given, it will use the ones by default defined in the
defaultConfig file.

If an output method is defined in the input config, and some properties are
defined, this function will send those properties to the out method, so the Front
will be able to use this data.

The message has three main properties:
 - sender: with the name of the sender (selectInteraction, by default).
 - parentLayer: the parent layer of the selected feature.
 - properties: the properties returned from the selected feature.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultSelectionValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigArray,
  checkInputConfigBoolean,
  checkInputConfigObject,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}   inputConfig                    The input parameters object.
 * @param {object}   inputConfig.name               The interaction name.
 * @param {string}   inputConfig.type               Choose the type of selection.
 * @param {array}    inputConfig.returnProperties   Choose the properties to return.
 * @param {boolean}  inputConfig.multiselection     Check if multiselection will be enabled.
 * @param {string}   inputConfig.outputMethod       The global method that receive the data.
 * @param {object}   inputConfig.map                The active map.
 *
 * @return {object}   Optional; return the choosen properties of the feature.
 */
export const enableSelectFeatures = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Set the name of the selection controller */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : defaultSelectionValues.name

  /** Get the type of selection. It can be */
  let type = checkInputConfigString(inputConfig, 'type')
    ? inputConfig.type
    : defaultSelectionValues.type

  /** Get the type of selection. It can be */
  const returnProperties = checkInputConfigArray(
    inputConfig,
    'returnProperties'
  )
    ? inputConfig.returnProperties
    : defaultSelectionValues.returnProperties

  /** Get the type of selection. It can be */
  /** TODO: handle multiple feature selection */
  const multiselection = checkInputConfigBoolean(inputConfig, 'multiselection')
    ? inputConfig.multiselection
    : defaultSelectionValues.multiselection

  /** Get the outputMethod name */
  const outputMethod = checkInputConfigString(inputConfig, 'outputMethod')
    ? inputConfig.outputMethod
    : defaultSelectionValues.outputMethod

  /** Set a variable to store the type of selection to use */
  let selection

  /** Set another variable to store the style to use in the highlight */
  const symbology = checkInputConfigObject(inputConfig, 'symbology')
    ? inputConfig.symbology
    : defaultSelectionValues.symbology

  /** Set the selection highlight styles */
  const pointSelectSymbology = new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: symbology.color
      }),
      stroke: new ol.style.Stroke({
        width: symbology.width,
        color: symbology.outlineColor
      }),
      radius: symbology.radius
    })
  })
  const lineStringSelectSymbology = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: symbology.outlineColor,
      width: symbology.width
    })
  })
  const polygonSelectSymbology = new ol.style.Style({
    fill: new ol.style.Fill({
      color: symbology.color
    }),
    stroke: new ol.style.Stroke({
      color: symbology.outlineColor,
      width: symbology.width
    })
  })

  /** Check the type of selection to do */
  switch (type.toLowerCase()) {
    case 'click':
      selection = new ol.interaction.Select({
        condition: ol.events.conditionclick
      })
      break
    case 'hover':
      break
    case 'dragbox':
      break
  }

  /** If no selection is defined, end the method */
  if (!selection) return

  /** Add the interaction to the map */
  map.addInteraction(selection)

  selection.on('select', event => {
    /** Get the features */
    const features = event.selected

    /** Iterate the selected features */
    features.forEach(feature => {
      /** Set a variable to define the style */
      let selectionStyle

      /** Check the geometry type of the selected feature */
      switch (feature.getGeometry().getType().toLowerCase()) {
        case 'point':
          selectionStyle = pointSelectSymbology
          break
        case 'linestring':
          selectionStyle = lineStringSelectSymbology
          break
        case 'polygon':
          selectionStyle = polygonSelectSymbology
          break
      }

      /** Change the symbology of the selected feature */
      feature.setStyle(selectionStyle)

      /** Check if the method with the provided name has been defined in the Front */
      if (typeof window[outputMethod] === 'undefined') return

      /** Set a object to store the feature properties */
      const properties = {
        sender: name,
        parentLayer: selection.getLayer(feature),
        properties: {}
      }

      /** Check the properties of the feature and add only the ones defined in the
       * input property */
      Object.entries(feature.getProperties()).forEach(property => {
        if (returnProperties.includes(property[0])) {
          properties.properties[property[0]] = property[1]
        }
      })

      /** Send the values to the Front method */
      window[outputMethod](properties)
    })
  })

  /** Set the vector layer properties */
  selection.set('interactionProperties', {})

  /** Add the name to the properties */
  selection.getProperties().interactionProperties.name = name
  selection.getProperties().interactionProperties.type = type.toLowerCase()
}

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 24/07/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Set the symbology of a vector layer

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultVectorLayerValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigNumber,
  checkInputConfigObject,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'

/**
 *
 * @param {object}   inputConfig                The input parameters object.
 * @param {string}   inputConfig.data           The GeoJSON object to load.
 * @param {string}   inputConfig.geometryType   The geometry of the layer.
 * @param {string}   inputConfig.name           The name of the layer.
 * @param {number}   inputConfig.opacity        The layer transparency.
 * @param {boolean}  inputConfig.visibility     Check if the layer will be showed or hidden.
 * @param {object}   inputConfig.map            The active map.
 *
 * @example
 * setLayerSymbology({
 * })
 */
export const setLayerSymbology = inputConfig => {
  /** Get the layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** Get the symbology object */
  const symbology = checkInputConfigObject(inputConfig, 'symbology')
    ? inputConfig.symbology
    : undefined

  /** TODO: check the symbology has the necessary properties */

  if (!layer) return

  /** Get the type of symbology to apply */
  const type =
    symbology && symbology.hasOwnProperty('type')
      ? inputConfig.symbology.type
      : defaultVectorLayerValues.symbology.type

  /** Get the symbology type through the type input */
  const symbologyProperties =
    symbology && symbology.hasOwnProperty(type)
      ? inputConfig.symbology[type]
      : undefined

  /** Check the symbology style to use in the layer */
  switch (type) {
    case 'singleSymbol':
      singleSymbolStyle(layer, symbologyProperties)
      break
    case 'uniqueValues':
      uniqueValuesStyle(layer, symbologyProperties)
      break
    case 'graduatedColors':
      graduatedColorsStyle(layer, symbologyProperties)
      break
    case 'graduatedSymbols':
      graduatedSymbolsStyle(layer, symbologyProperties)
      break
    case 'dotDensity':
      dotDensityStyle(layer, symbologyProperties)
      break
    case 'heatmap':
      heatmapStyle(layer, symbologyProperties)
      break
  }
}

/** METHODS */

/** In this type of symbology, every point, line or polygon will have the same
 * symbology style. By default if no symbology is defined, it will use the
 * Onesait colors */
const singleSymbolStyle = (layer, inputConfig) => {
  /** Set a variable to store the style to use */
  let style

  /** Get the geometry of the layer */
  const geometryType = layer.getProperties().layerProperties.geometry

  /** Get the symbology values */
  const radius = checkInputConfigNumber(inputConfig, 'radius')
    ? inputConfig.radius
    : defaultVectorLayerValues.symbology.radius

  /** Get the symbology values */
  const color = checkInputConfigString(inputConfig, 'color')
    ? inputConfig.color
    : defaultVectorLayerValues.symbology.color

  /** Get the symbology values */
  const width = checkInputConfigNumber(inputConfig, 'width')
    ? inputConfig.width
    : defaultVectorLayerValues.symbology.width

  /** Get the symbology values */
  const outlineColor = checkInputConfigString(inputConfig, 'outlineColor')
    ? inputConfig.outlineColor
    : defaultVectorLayerValues.symbology.outlineColor

  /** Check the geometry type to apply the correct styles */
  switch (geometryType) {
    case 'point':
      /** Set the style */
      style = new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: color
          }),
          stroke: new ol.style.Stroke({
            width: width,
            color: outlineColor
          }),
          radius: radius
        })
      })
      break
    case 'linestring':
      style = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: outlineColor,
          width: width
        })
      })
      break
    case 'polygon':
      style = new ol.style.Style({
        fill: new ol.style.Fill({
          color: color
        }),
        stroke: new ol.style.Stroke({
          color: outlineColor,
          width: width
        })
      })
      break
  }

  /** Update the layer styles */
  layer.setStyle(style)
}

const uniqueValuesStyle = (layer, inputConfig) => {}

/** This type of symbology will create a colorized map using the numeric value
 * of a selected field, broken with the values of the symbology to apply. If
 * those break values are for example 5 (green), 10 (orange) and 15 (red), the
 * choropleth map will represent all values as showed below:
 *  - From zero to 5: green color
 *  - From >5 to 10: orange color
 *  - From >10 to 15: red color
 *  - > 15: red color
 * The color value is the top limit (is not from 5 to be green, but until 5)
 */
const graduatedColorsStyle = (layer, inputConfig) => {
  /** Get the field to evaluate and the color ramp */
  const property = checkInputConfigString(inputConfig, 'property')
    ? inputConfig.property
    : undefined

  const symbology = checkInputConfigObject(inputConfig, 'color')
    ? inputConfig.color
    : undefined

  /** Check if the property and the symbology are both defined. If not, use the
   * default single symbology */
  if (!property || !symbology) {
    singleSymbolStyle(layer)
    return
  }

  /** Get the symbology values */
  const radius = checkInputConfigNumber(inputConfig, 'radius')
    ? inputConfig.radius
    : defaultVectorLayerValues.symbology.radius

  /** Get the outline width and color */
  const width = checkInputConfigNumber(inputConfig, 'width')
    ? inputConfig.width
    : defaultVectorLayerValues.symbology.width

  const outlineColor = checkInputConfigString(inputConfig, 'outlineColor')
    ? inputConfig.outlineColor
    : undefined

  /** Set a list to store the absolute values of the symbology breaks*/
  const colorValues = []

  /** Iterate the input symbology color ramp to get the break values */
  Object.keys(symbology).forEach(value => {
    colorValues.push(parseInt(value))
  })

  /** Retrieve the layer features */
  const features = layer.getSource().getFeatures()

  /** Iterate each feature to apply the new styles*/
  features.forEach(feature => {
    /** Get the geometry and the property value of the feature */
    const geometryType = feature.getGeometry().getType()
    const propertyValue = feature.getProperties()[property]
      ? feature.getProperties()[property]
      : 0

    /** Set a variable to store the color value to use */
    let rangeValue = 0

    /** Iterate the values and look for the valid range break. The first check
     * is for values below the first break, the second conditional is for
     * values equal or over the upper limit, and the last one is for values
     * between the lower and upper limit */
    for (let i = 0; i <= colorValues.length; i++) {
      if (propertyValue < colorValues[i]) {
        break
      } else if (
        propertyValue === colorValues[i] ||
        propertyValue > colorValues[colorValues.length - 1]
      ) {
        rangeValue = colorValues.length - 1
        break
      } else {
        rangeValue += 1
      }
    }

    /** Retrieve the color to apply through the symbology object index */
    const color = Object.values(symbology)[rangeValue]

    /** Set a variable to store the style */
    let style

    /** Check the geometry type to apply the correct styles */
    switch (geometryType.toLowerCase()) {
      case 'point':
        style = new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: color
            }),
            stroke: new ol.style.Stroke({
              width: width,
              color: outlineColor
            }),
            radius: radius
          })
        })
        break
      case 'linestring':
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: outlineColor,
            width: width
          })
        })
        break
      case 'polygon':
        style = new ol.style.Style({
          fill: new ol.style.Fill({
            color: color
          }),
          stroke: new ol.style.Stroke({
            color: outlineColor,
            width: width
          })
        })
        break
    }

    feature.setStyle(style)
  })
}

const graduatedSymbolsStyle = (layer, inputConfig) => {}

const dotDensityStyle = (layer, inputConfig) => {}

const heatmapStyle = (layer, inputConfig) => {}

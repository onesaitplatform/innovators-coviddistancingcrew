////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 08/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Loads a GeoJSON to the map and updates it properties.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultVectorLayerValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigBoolean,
  checkInputConfigNumber,
  checkInputConfigObject,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { addLayer } from './addLayer.js'
import { getActiveMap } from './getActiveMap.js'
import { setLayerSymbology } from './setLayerSymbology.js'

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
 * loadGeoJson({
 *   data: geojson,
 *   geometryType: 'Point',
 *   label: 'Capa de Ejemplo',
 *   name: 'example_layer_001',
 *   opacity: 0.7,
 *   visibility: true,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const loadGeoJson = inputConfig => {
  /** Get the GeoJSON data */
  const data =
    inputConfig && inputConfig.hasOwnProperty('data') && inputConfig.data
      ? inputConfig.data
      : undefined

  /** Check if the GeoJSON is defined */
  if (!data) return

  /** Get the active map */
  const map = getActiveMap(inputConfig)

  const name = getLayerName(
    data,
    inputConfig && inputConfig.hasOwnProperty('name')
      ? inputConfig.name
      : undefined
  )

  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : name

  /** Set the layer opacity */
  const opacity =
    checkInputConfigNumber(inputConfig, 'opacity') &&
    inputConfig.opacity >= 0 &&
    inputConfig.opacity <= 1
      ? inputConfig.opacity
      : defaultVectorLayerValues.opacity

  /** Get the transparency of the layer */
  const visibility = checkInputConfigBoolean(inputConfig, 'visibility')
    ? inputConfig.visibility
    : defaultVectorLayerValues.visibility

  /** Load the GeoJSON */
  const geoJson = new ol.format.GeoJSON().readFeatures(data, {
    featureProjection: map.getProperties().view.getProjection().getCode()
  })

  /** Set the vector source */
  const sourceVector = new ol.source.Vector({
    features: geoJson
  })

  /** Set a layer with the vector source */
  const vectorLayer = new ol.layer.Vector({
    source: sourceVector
  })

  /** Set the type and category of the layer */
  const type = defaultVectorLayerValues.layerProperties.type
  const geometry =
    checkInputConfigString(inputConfig, 'geometryType') &&
    defaultVectorLayerValues.validGeometries.includes(
      inputConfig.geometryType.toLowerCase()
    )
      ? inputConfig.geometryType.toLowerCase()
      : defaultVectorLayerValues.geometry

  /** Set the vector layer properties */
  vectorLayer.set('layerProperties', {})

  /** Add the name to the properties */
  vectorLayer.getProperties().layerProperties.name = name
  vectorLayer.getProperties().layerProperties.label = label
  vectorLayer.getProperties().layerProperties.type = type
  vectorLayer.getProperties().layerProperties.geometry = geometry

  /** Set the opacity and visibility of the layer */
  vectorLayer.setOpacity(opacity)
  vectorLayer.setVisible(visibility)

  /** Get the custom symbology */
  const symbology = checkInputConfigObject(inputConfig, 'symbology')
    ? inputConfig.symbology
    : undefined

  /** Set the symbology of the layer. If no symbology is defined then will be
   * used the default symbology */
  setLayerSymbology({ layer: vectorLayer, symbology: symbology })

  /** Send the layer to the layer handler */
  addLayer({ layer: vectorLayer, map: map })
}

/** METHODS */

const getLayerName = (data, inputName) => {
  /** Check if the input name exists */
  if (!inputName) {
    /** Check if the data has a name property */
    if (data.hasOwnProperty('name') && data.name && data.name.length > 0) {
      inputName = data.name
    } else {
      inputName = btoa(Math.random()).slice(5, 20)
    }
  }

  return inputName
}

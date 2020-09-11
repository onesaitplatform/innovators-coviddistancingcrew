////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 26/06/2020
// Updated on: 10/07/2020
//
// Version: 1.1.0-ol
////////////////////////////////////////////
/*

Loads a WMS service into the map viewer.

To use this method, is necessary to provide the URL of the WMS server, and then
provide the layers to load (array of strings). If the WMS server is known, it
can be defined in the input serverType property between one of the following:
'carmentaserver', 'geoserver', 'mapserver' or 'qgis'.


v1.1.0:
 - Default values now are general and come from a specific object, so it is not
 necessary to load all the default values object.
 - Added the properties of opacity, visibility and tiled as input params.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultWmsLayerValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigArray,
  checkInputConfigBoolean,
  checkInputConfigString,
  checkInputConfigNumber
} from '../../common/modules/checkInputConfigProperties.js'
import { addLayer } from './addLayer.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}   inputConfig              The input parameters object.
 * @param {string}   inputConfig.url          The URL of the OGC WMS service.
 * @param {array}    inputConfig.layers       The list of layers to import.
 * @param {string}   inputConfig.serverType   The type of the WMS server.
 * @param {boolean}  inputConfig.tiled        Check if the service will be tiled.
 * @param {string}   inputConfig.name         The internal name of the layer.
 * @param {string}   inputConfig.label        The pretty name of the layer.
 * @param {number}   inputConfig.opacity      The layers transparency.
 * @param {boolean}  inputConfig.visibility   Check if the layer will be showed or hidden.
 * @param {object}   inputConfig.map          The active map.
 *
 * @example
 * loadWms({
 *   url: 'http://sampleserver1b.arcgisonline.com/ArcGIS/services/Specialty/ESRI_StatesCitiesRivers_USA/MapServer/WMSServer',
 *   layers: ['1'],
 *   serverType: 'geoserver',
 *   opacity: 0.6,
 *   visibility: false,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const loadWms = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the service URL */
  const url = checkInputConfigString(inputConfig, 'url')
    ? inputConfig.url
    : defaultWmsLayerValues.url

  /** TODO: check the checkInputConfigArray */
  const layers = checkInputConfigArray(inputConfig, 'layers')
    ? inputConfig.layers
    : defaultWmsLayerValues.layers

  /** Check if the input URL exists, if not stop the function */
  if (!url || !layers) return

  /** Set the layer internal name */
  const name = inputConfig.name
    ? inputConfig.name
    : 'wms_' + btoa(Math.random()).slice(5, 20)

  /** Set the pretty layer name for Front purposes */
  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : name

  /** Set the server type to use hidpi if possible */
  const serverType = checkInputConfigString(inputConfig, 'serverType')
    ? inputConfig.serverType
    : defaultWmsLayerValues.serverType

  /** Check if the WMS service will be tiled */
  const tiled = checkInputConfigBoolean(inputConfig, 'tiled')
    ? inputConfig.tiled
    : defaultWmsLayerValues.tiled

  /** Get the transparency of the layer */
  const opacity =
    checkInputConfigNumber(inputConfig, 'opacity') &&
    inputConfig.opacity >= 0 &&
    inputConfig.opacity <= 1
      ? inputConfig.opacity
      : defaultWmsLayerValues.opacity

  /** Get the transparency of the layer */
  const visibility = checkInputConfigBoolean(inputConfig, 'visibility')
    ? inputConfig.visibility
    : defaultWmsLayerValues.visibility

  /** Set the type and category of the layer */
  const type = defaultWmsLayerValues.layerProperties.type
  const category = defaultWmsLayerValues.layerProperties.category

  /** Set the source of the WMS service */
  const source = new ol.source.TileWMS({
    url: url,
    params: {
      LAYERS: layers,
      TILED: tiled
    },
    serverType: serverType,
    transition: 0
  })

  /** Set the raster layer */
  const rasterLayer = new ol.layer.Tile({ source })

  /** Set the raster layer properties */
  rasterLayer.set('layerProperties', {})

  /** Add the layer properties */
  rasterLayer.getProperties().layerProperties.name = name
  rasterLayer.getProperties().layerProperties.label = label
  rasterLayer.getProperties().layerProperties.type = type
  rasterLayer.getProperties().layerProperties.category = category
  rasterLayer.getProperties().layerProperties.serverType = serverType

  /** Set the opacity and visibility of the layer */
  rasterLayer.setOpacity(opacity)
  rasterLayer.setVisible(visibility)

  /** Send the layer to the layer handler */
  addLayer({ layer: rasterLayer, map: map })
}

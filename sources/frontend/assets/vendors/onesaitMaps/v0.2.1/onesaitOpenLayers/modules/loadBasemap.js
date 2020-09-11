////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 08/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Loads a provided basemap to the map. It can be configurated to allow multiples
basemaps or only one.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultBasemapLayerValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigBoolean,
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { addLayer } from './addLayer.js'
import { getActiveMap } from './getActiveMap.js'
import { getMapLayers } from './getMapLayers.js'
import { removeMapLayer } from './removeMapLayer.js'

/**
 *
 * @param {object}   inputConfig                 The input parameters object.
 * @param {string}   inputConfig.label           Basemap custom name.
 * @param {string}   inputConfig.name            Basemap service name.
 * @param {string}   inputConfig.provider        The owner of the basemap.
 * @param {string}   inputConfig.requestKey      Does the map need a key?
 * @param {string}   inputConfig.key             Token for propietary basemaps.
 * @param {string}   inputConfig.url         		The URL of the basemap service.
 * @param {string}   inputConfig.layer         	The layer of the basemap if the service is a WMS.
 * @param {boolean}  inputConfig.isLabeling      The basemap will be a labeling layer.
 * @param {number}   inputConfig.opacity         Basemap transparency.
 * @param {boolean}  inputConfig.visibility      Check if the layer will be showed or hidden.
 * @param {boolean}  inputConfig.wrap            Wrap the world horizontally.
 * @param {boolean}  inputConfig.singleBasemap   Check if the user will want just one basemap.
 * @param {object}   inputConfig.map             The active map.
 *
 * @example
 * {
 *   name: 'Dark Gray',
 *   provider: 'esri',
 *   url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
 *   opacity: 0.3,
 *   wrap: true,
 *   singleBasemap: false,
 * }
 */
export const loadBasemap = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the basemap label */
  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : defaultBasemapLayerValues.label

  /** Get the basemap name */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : defaultBasemapLayerValues.name

  /** Get the provider name */
  const provider = checkInputConfigString(inputConfig, 'provider')
    ? inputConfig.provider
    : defaultBasemapLayerValues.provider

  /** Check if the basemap already exists */
  if (checkExistingBasemap(map, label)) return

  /** Get the provider name */
  const url = checkInputConfigString(inputConfig, 'url')
    ? inputConfig.url
    : undefined

  if (!url && provider.toLowerCase() !== 'osm') return

  /** Get if basemap needs a license key to use it */
  const requestKey = checkInputConfigString(inputConfig, 'requestKey')
    ? inputConfig.requestKey
    : defaultBasemapLayerValues.requestKey

  /** Get the basemap license key */
  const key = checkInputConfigString(inputConfig, 'key')
    ? inputConfig.key
    : defaultBasemapLayerValues.key

  /** Check if the basemap needs a license key, and is provided */
  if (requestKey && !key) return

  /** Get the basemap name */
  const layer = checkInputConfigString(inputConfig, 'layer')
    ? inputConfig.layer
    : undefined

  /** Check if the basemap layer will be boundaries labeling layer */
  const isLabeling = checkInputConfigBoolean(inputConfig, 'isLabeling')
    ? inputConfig.isLabeling
    : defaultBasemapLayerValues.isLabeling

  /** Get the basemap opacity */
  const opacity =
    checkInputConfigNumber(inputConfig, 'opacity') &&
    inputConfig.opacity >= 0 &&
    inputConfig.opacity <= 1
      ? inputConfig.opacity
      : defaultBasemapLayerValues.opacity

  /** Get the transparency of the layer */
  const visibility = checkInputConfigBoolean(inputConfig, 'visibility')
    ? inputConfig.visibility
    : defaultBasemapLayerValues.visibility

  /** Get the basemap opacity */
  const wrap = checkInputConfigString(inputConfig, 'wrap')
    ? inputConfig.wrap
    : defaultBasemapLayerValues.wrap

  /** Get the basemap opacity */
  const singleBasemap = checkInputConfigBoolean(inputConfig, 'singleBasemap')
    ? inputConfig.singleBasemap
    : defaultBasemapLayerValues.singleBasemap

  /** Get the list of the active map layers */
  const layerList = getMapLayers({ map: map })

  /** Check if will be just one basemap or several ones */
  if (singleBasemap && layerList.length > 0) {
    layerList.forEach(layer => {
      if (
        layer.getProperties().hasOwnProperty('layerProperties') &&
        layer.getProperties().layerProperties.category === 'basemap'
      )
        removeMapLayer({ layer: layer })
    })
  }

  /** Set a variable to store the basemap */
  let source

  /** Launch the appropiate method to set the basemap */
  switch (provider.toLowerCase()) {
    case 'bingmaps':
      source = new ol.source.BingMaps({
        key: key
      })
      break
    case 'osm':
      if (url) {
        /** Set the basemap */
        source = new ol.source.OSM({
          url: url,
          wrapX: wrap
        })
      } else {
        /** Set the source of the basemap */
        source = new ol.source.OSM({
          wrapX: wrap
        })
      }
      break
    case 'stamen':
      source = new ol.source.Stamen({
        layer: name
      })
      break
    case 'wms':
      if (layer) {
        source = new ol.source.TileWMS({
          url: url,
          params: {
            // LAYERS: 'onesaitplatform:Topographic_OpenStreetMap_WMS',
            LAYERS: layer,
            TILED: true
          },
          serverType: 'geoserver',
          transition: 0
        })
      }

      break
    default:
      source = new ol.source.XYZ({
        url: url,
        wrapX: wrap
      })
      break
  }

  /** Set the  */
  const basemap = new ol.layer.Tile({ source })

  /** Set the basemap layer properties */
  basemap.set('layerProperties', {})

  /** Add the layer properties */
  basemap.getProperties().layerProperties.label = label
  basemap.getProperties().layerProperties.name = name
  basemap.getProperties().layerProperties.type =
    defaultBasemapLayerValues.layerProperties.type
  basemap.getProperties().layerProperties.category =
    defaultBasemapLayerValues.layerProperties.category
  basemap.getProperties().layerProperties.isLabeling = isLabeling

  /** Set the opacity and visibility of the layer */
  basemap.setOpacity(opacity)
  basemap.setVisible(visibility)

  /** Send the layer to the layer handler */
  addLayer({ layer: basemap, isLabeling: isLabeling, map: map })
}

/** METHODS */
const checkExistingBasemap = (map, label) => {
  let exist = false

  /** Get the map layers */
  const layerList = getMapLayers({ map: map })

  /** Check the layer list */
  if (layerList.length > 0) {
    layerList.forEach(layer => {
      if (
        layer.getProperties().hasOwnProperty('layerProperties') &&
        layer.getProperties().layerProperties.type === 'raster' &&
        layer.getProperties().layerProperties.category === 'basemap' &&
        layer.getProperties().layerProperties.label === label
      ) {
        exist = true
      }
    })
  }

  return exist
}

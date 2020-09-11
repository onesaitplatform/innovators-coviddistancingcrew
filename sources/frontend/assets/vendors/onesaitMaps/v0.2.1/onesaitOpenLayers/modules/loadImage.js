////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 26/06/2020
// Updated on: 10/07/2020
//
// Version: 1.1.0-ol
////////////////////////////////////////////
/*

Loads a static image into the map viewer.

To use this method, is necessary to provide the URL of the image and the extent
where to 'paste' the image over the map. This extent contains the coordinates of
the southwest (start) and northeast (end) as an array of longitude and latitude.


v1.1.0:
 - Default values now are general and come from a specific object, so it is not
 necessary to load all the default values object.
 - Added the properties of opacity and visibility input params.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultImageLayerValues } from '../../common/defaultConfig/defaultConfig.js'
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
 * @param {string}   inputConfig.url          The URL of the image.
 * @param {array}    inputConfig.extent       The coordinates of the lower-left and upper-right points.
 * @param {string}   inputConfig.epsg         The projection system of the extent.
 * @param {string}   inputConfig.units        The units to use if no EPSG is defined.
 * @param {string}   inputConfig.name         The internal name of the layer.
 * @param {string}   inputConfig.label        The pretty name of the layer.
 * @param {number}   inputConfig.opacity      The layers transparency.
 * @param {boolean}  inputConfig.visibility   Check if the layer will be showed or hidden.
 * @param {object}   inputConfig.map          The active map.
 *
 * @example
 * loadImage({
 *   name: 'ExampleImage',
 *   url: './img/imagen.jpg',
 *   extent: [-9399763.59046, 3994069.75194, -9399209.78007, 3994625.9702],
 *   epsg: 'EPSG:3857',
 *   units: 'pixels',
 *   opacity: 0.6,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const loadImage = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the URL of the image */
  const url = checkInputConfigString(inputConfig, 'url')
    ? inputConfig.url
    : defaultImageLayerValues.url

  /** Get the extent of the image */
  const extent = checkInputConfigArray(inputConfig, 'extent')
    ? inputConfig.extent
    : defaultImageLayerValues.extent

  /** Get the image */
  const epsg = checkInputConfigString(inputConfig, 'epsg')
    ? inputConfig.epsg
    : defaultImageLayerValues.epsg

  /** Set a variable to store the units*/
  let units = undefined

  /** If no epsg has been defined, retrieve the units for the image */
  if (!epsg) {
    units = checkInputConfigString(inputConfig, 'units')
      ? inputConfig.units
      : defaultImageLayerValues.units
  }

  /** Check if the image and the extent exists */
  if (!extent || !url) return

  /** Set the layer internal name */
  const name = inputConfig.name
    ? inputConfig.name
    : 'img_' + btoa(Math.random()).slice(5, 20)

  /** Set the pretty layer name for Front purposes */
  const label = checkInputConfigString(inputConfig, 'label')
    ? inputConfig.label
    : name

  /** Set the layer transparency */
  const opacity =
    checkInputConfigNumber(inputConfig, 'opacity') &&
    inputConfig.opacity >= 0 &&
    inputConfig.opacity <= 1
      ? inputConfig.opacity
      : defaultImageLayerValues.opacity

  /** Get the transparency of the layer */
  const visibility = checkInputConfigBoolean(inputConfig, 'visibility')
    ? inputConfig.visibility
    : defaultImageLayerValues.visibility

  /** Set the projection properties */
  const projection = new ol.proj.Projection({
    code: epsg,
    unites: units,
    extent: extent
  })

  /** Set the image layer */
  const imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
      url: url,
      projection: projection,
      imageExtent: extent
    })
  })

  /** Set the type and category of the layer */
  const type = defaultImageLayerValues.layerProperties.type
  const category = defaultImageLayerValues.layerProperties.category

  /** Set the image layer properties */
  imageLayer.set('layerProperties', {})

  /** Add the name to the properties */
  imageLayer.getProperties().layerProperties.name = name
  imageLayer.getProperties().layerProperties.label = label
  imageLayer.getProperties().layerProperties.type = type
  imageLayer.getProperties().layerProperties.category = category

  /** Set the opacity to the layer */
  imageLayer.setOpacity(opacity)
  imageLayer.setVisible(visibility)

  /** Send the layer to the layer handler */
  addLayer({ layer: imageLayer, map: map })
}

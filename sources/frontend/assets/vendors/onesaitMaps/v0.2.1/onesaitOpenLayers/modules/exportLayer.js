////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 16/06/2020
//
// Version: 0.1.0-ol
////////////////////////////////////////////
/*

Returns a GeoJSON created from a specific layer if it has at least one feature.
If is empty, it will return an undefined.

The existins GeoJSON will have it geometry properties projected in EPSG:4326.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigLayer } from './checkInputConfigLayer.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {object}  inputConfig.layer   The layer that will be used as input.
 *
 * @returns {object|undefined}   Returns a GeoJSON or undefined.
 *
 * @example
 * exportLayer({
 *   layer: map.getLayers().getArray()[1]
 * })
 */
export const exportLayer = inputConfig => {
  /** Get the layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** If no layer is defined, end the function */
  if (!layer) return

  /** Set a list to store the geometries of each feature */
  const geometryList = []

  /** Iterate the layer features and retrieve the geometries */
  layer.getSource().forEachFeature(feature => {
    geometryList.push(
      new ol.Feature(
        feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326')
      )
    )
  })

  /** Return the geojson if it has at least one feature*/
  return geometryList.length > 0
    ? new ol.format.GeoJSON().writeFeatures(geometryList)
    : undefined
}

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 15/06/2020
//
// Version: 1.0.1-ol
////////////////////////////////////////////
/*

This function will pan and zoom the camera to the position and zoom given. If 
both parameters are undefined, nothing will happen. If only position or zoom is
given, then the map will be panned with the actual zoom, or will be zoomed with
the actual position.

v1.0.1: renamed from zoomToPostion to setZoomToPosion

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { getActiveMap } from '../modules/getActiveMap.js'
import {
  checkInputConfigArray,
  checkInputConfigNumber
} from '../../common/modules/checkInputConfigProperties.js'

/**
 *
 * @param {object}  inputConfig            The input parameters object.
 * @param {string}  inputConfig.position   The coordinates in lon/lat format to do the zoom.
 * @param {number}  inputConfig.zoom       The zoom level to apply.
 * @param {object}  inputConfig.map        The active map.
 *
 * @example
 * setCameraToPosition({
 *   position: [-3.713, 40.2085],
 *   zoom: 6,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 */
export const setCameraToPosition = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the position to zoom */
  const position = checkInputConfigArray(inputConfig, 'position')
    ? inputConfig.position
    : undefined

  /** Get the amount of zoom */
  const zoom = checkInputConfigNumber(inputConfig, 'zoom')
    ? inputConfig.zoom
    : undefined

  /** If both parameters are undefined, end right now */
  if (!position && !zoom) return

  /** Chech what will be happening */
  if (position && !zoom) {
    /** If only the position has been defined */
    map.getView().setCenter(ol.proj.fromLonLat(position))
  } else if (!position && zoom) {
    /** If only the zoom amount has been defined */
    map.getView().setZoom(zoom)
  } else {
    /** Both parameters are defined */
    map.setView(
      new ol.View({
        center: ol.proj.fromLonLat(position),
        zoom: zoom
      })
    )
  }
}

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 08/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Create a map container in the provided name. If the name is undefined or not
exist, then try to use the default one. If the name name is repeated, the map
container will not be created.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultMapContainer } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigArray,
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'

/**
 * @param {string}  name       The class name of the DIV.
 * @param {array}   position   Coordinates of the camera at the start.
 * @param {number}  zoom       The zoom of the camera over the position.
 * @param {array}   controls   The controls to use by default.
 *
 * @return {object}  Returns the created map.
 *
 */
export const setMap = inputConfig => {
  /** Check if the input config exists */
  if (!inputConfig) return

  /** Get the class name of the DIV */
  const name = checkInputConfigString(inputConfig, 'name')
    ? inputConfig.name
    : defaultMapContainer.name

  /** Set a variable to store the map container */
  let map

  /** Look for other maps with the same name */
  let uniqueMap = true
  if (onesaitOpenLayers.management.maps.length > 0) {
    onesaitOpenLayers.management.maps.forEach(lookingMap => {
      if (lookingMap.hasOwnProperty('name') && lookingMap.name === name) {
        uniqueMap = false
        lookingMap = map
      }
    })
  }

  /** If a map with the same name already exist, stop */
  if (!uniqueMap) {
    return map
  } else {
    /** Set the initial camera position */
    const position = checkInputConfigArray(inputConfig, 'position')
      ? inputConfig.position
      : defaultMapContainer.position

    /** Set the initial camera position */
    const zoom = checkInputConfigNumber(inputConfig, 'zoom')
      ? inputConfig.zoom
      : defaultMapContainer.zoom

    /** Set the map projection */
    const epsg = checkInputConfigString(inputConfig, 'epsg')
      ? inputConfig.epsg
      : defaultMapContainer.epsg

    /** TODO: remove controls through an input param */
    const removeControls = ol.control.defaults({
      attribution: false,
      zoom: false
    })

    /** Set the map container */
    map = new ol.Map({
      target: name,
      controls: removeControls,
      // renderer: 'webgl',
      view: new ol.View({
        projection: epsg,
        center: epsg === 'EPSG:3857' ? ol.proj.fromLonLat(position) : position,
        zoom: zoom
      })
    })

    /** Add a map name using the name name (unique name) */
    map.name = name

    /** Add the map container to the API map list */
    onesaitOpenLayers.management.maps.push(map)

    /** Return the map container */
    return map
  }
}

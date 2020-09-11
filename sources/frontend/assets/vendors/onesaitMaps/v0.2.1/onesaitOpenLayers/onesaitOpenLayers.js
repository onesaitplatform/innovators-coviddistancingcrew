////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 11/06/2020
//
// Version: 1.1.0
////////////////////////////////////////////
/*

Onesait OpenLayers API caller.

*/
////////////////////////////////////////////

/** Import the modules */
import { addLayer } from './modules/addLayer.js'
import { changeMouseCoordinatesOutput } from './modules/changeMouseCoordinatesOutput.js'
import { drawGeometry } from './modules/drawGeometry.js'
import { enableSelectFeatures } from './modules/enableSelectFeatures.js'
import { enableSwipeLayers } from './modules/enableSwipeLayers.js'
import { exportLayer } from './modules/exportLayer.js'
import { geocoding } from './modules/geocoding.js'
import { getActiveMap } from './modules/getActiveMap.js'
import { getFeaturesFromLayer } from './modules/getFeaturesFromLayer.js'
import { getMapInteractionByName } from './modules/getMapInteractionByName.js'
import { getMapInteractions } from './modules/getMapInteractions.js'
import { getMapLayerByName } from './modules/getMapLayerByName.js'
import { getMapLayers } from './modules/getMapLayers.js'
import { getMapControllerByName } from './modules/getMapControllerByName.js'
import { getMapControllers } from './modules/getMapControllers.js'
import { getMapExtent } from './modules/getMapExtent.js'
import { getUserGeolocation } from './modules/getUserGeolocation.js'
import { handleLayers } from './modules/handleLayers.js'
import { loadBasemap } from './modules/loadBasemap.js'
import { loadGeoJson } from './modules/loadGeoJson.js'
import { loadImage } from './modules/loadImage.js'
import { loadWms } from './modules/loadWms.js'
import { removeMapInteraction } from './modules/removeMapInteraction.js'
import { removeMapLayer } from './modules/removeMapLayer.js'
import { setCameraToPosition } from './modules/setCameraToPosition.js'
import { setControlMouseCoordinates } from './modules/setControlMouseCoordinates.js'
import { setLayerSymbology } from './modules/setLayerSymbology.js'
import { setLayerTransparency } from './modules/setLayerTransparency.js'
import { setLayerVisibility } from './modules/setLayerVisibility.js'
import { setMap } from './modules/setMap.js'
import { setMapScale } from './modules/setMapScale.js'

/** Set the API object for calling the methods */
export const onesaitOpenLayers = {
  management: {
    maps: [],
    version: '0.2.1'
  },
  apis: {},
  addLayer: addLayer,
  changeMouseCoordinatesOutput: changeMouseCoordinatesOutput,
  drawGeometry: drawGeometry,
  enableSelectFeatures: enableSelectFeatures,
  enableSwipeLayers: enableSwipeLayers,
  exportLayer: exportLayer,
  getActiveMap: getActiveMap,
  getFeaturesFromLayer: getFeaturesFromLayer,
  getMapInteractionByName: getMapInteractionByName,
  getMapInteractions: getMapInteractions,
  getMapLayerByName: getMapLayerByName,
  getMapLayers: getMapLayers,
  getUserGeolocation: getUserGeolocation,
  getMapExtent: getMapExtent,
  getMapControllerByName: getMapControllerByName,
  getMapControllers: getMapControllers,
  geocoding: geocoding,
  handleLayers: handleLayers,
  loadBasemap: loadBasemap,
  loadGeoJson: loadGeoJson,
  loadImage: loadImage,
  loadWms: loadWms,
  removeMapInteraction: removeMapInteraction,
  removeMapLayer: removeMapLayer,
  setCameraToPosition: setCameraToPosition,
  setControlMouseCoordinates: setControlMouseCoordinates,
  setLayerSymbology: setLayerSymbology,
  setLayerTransparency: setLayerTransparency,
  setLayerVisibility: setLayerVisibility,
  setMap: setMap,
  setMapScale: setMapScale
}

/** Make the API globally accessible */
window.onesaitOpenLayers = onesaitOpenLayers

/** Send a message to the browser console with the API version */
console.warn(
  'Onesait OpenLayers API loaded and working.\nVersion: ' +
    onesaitOpenLayers.management.version
)

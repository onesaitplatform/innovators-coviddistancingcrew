////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 09/06/2020
// Updated on: 05/20/2020
//
// Version: 2.0.0
////////////////////////////////////////////
/*

Set the default values to use in the API methods when the inputConfig is not
defined or not all properties has been defined by the user.

This default values can be changed to define different default properties.

In this version, properties for CesiumJS, Leaflet and OpenLayers are together in
the same file.

*/
////////////////////////////////////////////

/** Definition of the default values for everything in the API */
const defaultConfig = {
  /** Default basemap properties */
  basemapLayer: {
    label: 'OpenStreetMaps',
    name: 'Mapnik',
    provider: 'OSM',
    requestKey: false,
    key: undefined,
    url: undefined,
    isLabeling: false,
    opacity: 1,
    visibility: true,
    wrap: true,
    singleBasemap: false,
    layerProperties: {
      type: 'raster',
      category: 'basemap'
    }
  },
  drawingLayer: {
    name: 'drawing-layer',
    label: 'Drawing layer',
    freehand: false,
    oneTime: false,
    opacity: 1,
    visibility: true,
    layerProperties: {
      type: 'vector',
      geometry: 'Point'
    }
  },
  /** The default format of the coordinates of the map extent */
  extent: {
    epsg: 'EPSG:4326'
  },
  geocoding: {
    type: 'address',
    geocoder: 'nominatim',
    key: undefined,
    candidates: 5,
    zoom: 19
  },
  layerVisibility: {
    visible: true
  },
  /** Default properties for the map container */
  mapContainer: {
    /** Class name of the div defined in the HTML */
    name: 'mapContainer',
    /** Starting position of the map */
    position: [-3.713, 40.2085], // Iberian Peninsula
    /** Starting zoom */
    zoom: 6, // For OpenLayers and Leaflet
    /** Starting height */
    height: 2300000, // For Cesium
    /** Projection system */
    epsg: 'EPSG:3857', // For Cesium
    /** Type of scene view; COLUMBUS_VIEW: 1; SCENE2D: 2; SCENE3D: 3 */
    sceneMode: 2, // For Cesium
    /** Set the map viewer as 3D only (optimizated) */
    scene3DOnly: false // For Cesium
  },
  mapCoordinates: {
    /** The default name for the controller */
    name: 'mouse-position-controller',
    className: 'custom-mouse-position',
    epsg: 'EPSG:4326',
    precision: 4,
    outMapText: 'Out of bounds'
  },
  mapScale: {
    name: 'map-scale-controller',
    minWidth: 100,
    units: 'metric',
    bar: true,
    steps: 4,
    text: true
  },
  selection: {
    name: 'selectInteraction',
    type: 'click',
    returnProperties: ['id'],
    multiselection: false,
    outputMethod: 'valuesFromMap',
    symbology: {
      radius: 10,
      color: 'rgba(232, 126, 4, 0.85)',
      width: 3,
      outlineColor: 'rgba(241, 90, 34, 1)'
    }
  },
  imageLayer: {
    url: undefined,
    extent: undefined,
    epsg: undefined,
    units: 'pixels',
    opacity: 1,
    visibility: true,
    layerProperties: {
      type: 'raster',
      category: 'image'
    }
  },
  vectorLayer: {
    data: undefined,
    name: undefined,
    label: undefined,
    opacity: 1,
    visibility: true,
    layerProperties: {
      type: 'vector',
      geometry: undefined
    },
    symbology: {
      type: 'singleSymbol',
      radius: 7,
      color: 'rgba(171, 196, 214, 0.85)',
      width: 1.5,
      outlineColor: 'rgba(26, 59, 71, 1)'
    },
    validGeometries: [
      'point',
      'multipoint',
      'linestring',
      'multilinestring',
      'polygon',
      'multipolygon'
    ]
  },
  wmsLayer: {
    url: undefined,
    layers: undefined,
    serverType: undefined,
    tiled: true,
    opacity: 1,
    visibility: true,
    layerProperties: {
      type: 'raster',
      category: 'wms'
    }
  }
}

/** Split the properties in different export variables to optimize the importing */
export const defaultBasemapLayerValues = defaultConfig.basemapLayer
export const defaultDrawingLayerValues = defaultConfig.drawingLayer
export const defaultExtentValue = defaultConfig.extent
export const defaultGeocodingValues = defaultConfig.geocoding
export const defaultImageLayerValues = defaultConfig.imageLayer
export const defaultLayerVisibility = defaultConfig.layerVisibility
export const defaultMapContainer = defaultConfig.mapContainer
export const defaultMapCoordinates = defaultConfig.mapCoordinates
export const defaultMapScale = defaultConfig.mapScale
export const defaultSelectionValues = defaultConfig.selection
export const defaultVectorLayerValues = defaultConfig.vectorLayer
export const defaultWmsLayerValues = defaultConfig.wmsLayer

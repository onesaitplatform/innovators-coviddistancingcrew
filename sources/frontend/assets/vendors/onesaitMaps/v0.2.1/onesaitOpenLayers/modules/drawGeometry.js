////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 16/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Draw standard geometries through a defined input geometry type. This one can be:
 - Point
 - LineString
 - Polygon
 - Rectangle
 - Circle
 - Box

For the moment, the first letter MUST BE in upperCase format.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultDrawingLayerValues } from '../../common/defaultConfig/defaultConfig.js'
import {
  checkInputConfigBoolean,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'
import { addLayer } from './addLayer.js'
import { getActiveMap } from './getActiveMap.js'
import { getMapLayers } from './getMapLayers.js'

/** Set some global variables to store the status of the drawing options */
// TODO: This will surely cause problems in environments with multiple maps, so
//    those global variables should be setted in the map container itself.
//    Future me: do it with a smile.

/**
 *
 * @param {object}   inputConfig            The input parameters object.
 * @param {string}   inputConfig.geometry   The type of geometry to draw.
 * @param {object}   inputConfig.layer      The layer that will be used as canvas.
 * @param {boolean}  inputConfig.snapping   Check if the snapping will be enabled. --> TODO
 * @param {object}   inputConfig.map        The active map.
 *
 * @example
 * drawGeometry({
 *   geometry: 'Point',
 *   freehand: true,
 *   layer: map.getLayers().getArray()[1],
 *   snapping: false,
 *   oneTime: true,
 *   map: onesaitOpenLayers.management.maps[0]
 * })
 *
 */
export const drawGeometry = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the geometry to draw */
  let geometry = checkInputConfigString(inputConfig, 'geometry')
    ? inputConfig.geometry
    : defaultDrawingLayerValues.layerProperties.geometry

  /** Get the layer to use for drawing */
  let layer = checkInputConfigLayer(inputConfig) ? inputConfig.layer : undefined

  /** Get the list of the active map layers */
  const layerList = getMapLayers({ map: map })

  /** If the layer doesn't exist, try to find the default one, and if doesn't
   * exists, create a new one through the geometry type */
  if (!layer) {
    if (layerList.length > 0) {
      layerList.forEach(lookingLayer => {
        if (
          lookingLayer.getProperties().layerProperties.name ===
          defaultDrawingLayerValues.name
        ) {
          layer = lookingLayer
        }
      })
    }

    /** Create a new one if doesn't exists already */
    if (!layer) {
      const source = new ol.source.Vector({ wrapX: false })
      layer = new ol.layer.Vector({
        source: source
      })

      /** Set the vector layer properties */
      layer.set('layerProperties', {})
      layer.getProperties().layerProperties.name =
        defaultDrawingLayerValues.name
      layer.getProperties().layerProperties.label =
        defaultDrawingLayerValues.label
      layer.getProperties().layerProperties.type =
        defaultDrawingLayerValues.layerProperties.type
      layer.getProperties().layerProperties.geometry =
        defaultDrawingLayerValues.layerProperties.geometry

      /** Send the layer to the layer handler */
      addLayer({ layer: layer, map: map })
    }
  }

  /** Set interactions */
  let draw
  let modify = new ol.interaction.Modify({ source: layer.getSource() })
  let snapping = new ol.interaction.Snap({ source: layer.getSource() })

  // TODO: in a near future, the snapping property should be activated from the
  // tools bar in the Front. This can be done updating the controller properties.

  /** Set a variable to store later if the shape to draw will be 'special' */
  let specialShape

  /** Check if the geometry to draw is a box or a square */
  if (geometry === 'Box') {
    specialShape = ol.interaction.Draw.createBox()
  } else if (geometry === 'Square') {
    specialShape = ol.interaction.Draw.createRegularPolygon(4)
  }

  /** Change the geometry type to circle if box or square */
  geometry = geometry === 'Box' || geometry === 'Square' ? 'Circle' : geometry

  /** Check if freehand will be enabled using the Alt key */
  // const freehandCondition = freehand ? undefined : ol.events.condition.never

  /** Set the draw interaction */
  draw = new ol.interaction.Draw({
    source: layer.getSource(),
    type: geometry,
    geometryFunction: specialShape,
    stopClick: true,
    condition: drawingEvent => {
      /** Allows drawing only with the left click, and stop the drawing action
       * with the right click */
      if (drawingEvent.pointerEvent.buttons === 1) {
        return true
      } else {
        /** Remove the map interactions */
        stopDrawing(draw, modify, snapping)
      }
    }
  })

  /** Add the map interactions */
  map.addInteraction(draw)
  map.addInteraction(modify)
  map.addInteraction(snapping)

  /** Set the vector layer properties */
  draw.set('interactionProperties', {})
  modify.set('interactionProperties', {})
  snapping.set('interactionProperties', {})

  /** Add the name to the properties */
  draw.getProperties().interactionProperties.name = 'drawInteraction'
  modify.getProperties().interactionProperties.name = 'modifyInteraction'
  snapping.getProperties().interactionProperties.name = 'snappingInteraction'

  /** Check if the user will be able to draw several times or just one per click */
  const oneTime = checkInputConfigBoolean(inputConfig, 'oneTime')
    ? inputConfig.oneTime
    : defaultDrawingLayerValues.oneTime

  if (oneTime) {
    /** Wait until ends drawing */
    draw.on('drawend', () => {
      stopDrawing(draw, modify, snapping)
    })
  }
}

/** METHODS */

const stopDrawing = (draw, modify, snapping) => {
  map.removeInteraction(draw)
  map.removeInteraction(modify)
  map.removeInteraction(snapping)
}

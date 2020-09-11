////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 22/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Change the layer visibility option.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { defaultLayerVisibility } from '../../common/defaultConfig/defaultConfig.js'
import { checkInputConfigBoolean } from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'

/**
 *
 * @param {object}  inputConfig           The input parameters object.
 * @param {object}  inputConfig.layer     The layer to show or hide.
 * @param {object}  inputConfig.visible   Check if the layer will be showed or hidden.
 *
 * @example
 * setLayerVisibility({
 *   layer: map.getLayers().getArray()[0],
 *   visible: false
 * })
 */
export const setLayerVisibility = inputConfig => {
  /** Get the target layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** If the layer doesn't exist, stop the method */
  if (!layer) return

  /** Get the visibility property */
  const visible = checkInputConfigBoolean(inputConfig, 'visible')
    ? inputConfig.visible
    : defaultLayerVisibility.visible

  /** Apply the property */
  layer.setVisible(visible)
}

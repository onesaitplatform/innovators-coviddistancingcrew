////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 26/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Change the layer opacity.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import { checkInputConfigNumber } from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'

/**
 *
 * @param {object}  inputConfig         The input parameters object.
 * @param {object}  inputConfig.layer   The layer to show or hide.
 * @param {object}  inputConfig.alpha   Check if the layer will be showed or hidden.
 *
 * @example
 * setLayerTransparency({
 *   layer: map.getLayers().getArray()[0],
 *   alpha: 0.6
 * })
 */
export const setLayerTransparency = inputConfig => {
  /** Get the target layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** Get the opacity property */
  let alpha = checkInputConfigNumber(inputConfig, 'alpha')
    ? inputConfig.alpha
    : undefined

  /** Check if the opacity value is in the range */
  alpha = alpha && alpha >= 0.0 && alpha <= 1.0 ? alpha : undefined

  /** If the layer or alpha value doesn't exist, end the method */
  if (!layer || !alpha) return

  /** Apply the property */
  layer.setOpacity(parseFloat(alpha))
}

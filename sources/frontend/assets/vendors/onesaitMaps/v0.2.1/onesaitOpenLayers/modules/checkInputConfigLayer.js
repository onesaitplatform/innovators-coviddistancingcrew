////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 11/06/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

Check if a property exists in the inputConfig object and its a layer. To check
it, it will look for a object property called layerProperties that is added
when the layer is created.

This means that this checker will only works with those layers created using the
Onesait OpenLayers API.

Returns true if is a valid layer, and false if is not a layer or a layer created
outside the API.

*/
////////////////////////////////////////////

/**
 * @param {object}  inputConfig   The input parameters object.
 * @param {string}  layer         The name of the layer property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigLayer(inputConfig)
 */
export const checkInputConfigLayer = inputConfig => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty('layer') &&
    inputConfig.layer &&
    typeof inputConfig.layer === 'object' &&
    !Array.isArray(inputConfig.layer) &&
    inputConfig.layer.getProperties().hasOwnProperty('layerProperties')
  )
}

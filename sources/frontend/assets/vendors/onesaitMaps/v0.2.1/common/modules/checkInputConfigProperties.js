////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 11/06/2020
// Updated on: 05/07/2020
//
// Version: 2.0.0
////////////////////////////////////////////
/*

This module has several checks for the inputConfig properties. In this version,
all the checks has been grouped in one file.

*/
////////////////////////////////////////////

/**
 * Check if a property exists in the inputConfig object and its an array.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  array         The name of the array property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigString(inputConfig, "coordinates")
 */
export const checkInputConfigArray = (inputConfig, array) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(array) &&
    typeof inputConfig[array] !== 'undefined' &&
    Array.isArray(inputConfig[array])
  )
}

/**
 * Check if a property exists in the inputConfig object and its a boolean.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  boolean       The name of the boolean property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigBoolean(inputConfig, "visible")
 */
export const checkInputConfigBoolean = (inputConfig, boolean) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(boolean) &&
    typeof inputConfig[boolean] === 'boolean'
  )
}

/**
 * Check if a property exists in the inputConfig object and its a valid class div
 * element.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  class            The name of the div property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigDivClass(inputConfig, "mapContainer")
 */
export const checkInputConfigDivClass = (inputConfig, divClass) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(divClass) &&
    inputConfig[divClass] &&
    document.getElementsByClassName(inputConfig[divClass])[0]
  )
}

/**
 * Check if a property exists in the inputConfig object and its a valid ID div
 * element.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  id            The name of the div property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigDivId(inputConfig, "mapContainer")
 */
export const checkInputConfigDivId = (inputConfig, divId) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(divId) &&
    inputConfig[divId] &&
    document.getElementById(inputConfig[divId])
  )
}

/**
 * Check if a property exists in the inputConfig object and its a number per se
 * (not a number as a string)
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  number        The name of the number property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigNumber(inputConfig, "zoom")
 */
export const checkInputConfigNumber = (inputConfig, number) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(number) &&
    inputConfig[number] &&
    typeof inputConfig[number] === 'number'
  )
}

/**
 * Check if a property exists in the inputConfig object and its an object.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  array         The name of the array property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigObject(inputConfig, "coordinates")
 */
export const checkInputConfigObject = (inputConfig, object) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(object) &&
    typeof inputConfig[object] === 'object' &&
    !Array.isArray(inputConfig[object])
  )
}

/**
 * Check if a property exists in the inputConfig object and its a string and its
 * not empty.
 * @param   {object}  inputConfig   The input parameters object.
 * @param   {string}  string        The name of the string property to evaluate.
 *
 * @returns {boolean}
 *
 * @example
 * checkInputConfigString(inputConfig, "name")
 */
export const checkInputConfigString = (inputConfig, string) => {
  return (
    inputConfig &&
    typeof inputConfig === 'object' &&
    !Array.isArray(inputConfig) &&
    inputConfig.hasOwnProperty(string) &&
    inputConfig[string] &&
    typeof inputConfig[string] === 'string' &&
    inputConfig[string].length > 0
  )
}

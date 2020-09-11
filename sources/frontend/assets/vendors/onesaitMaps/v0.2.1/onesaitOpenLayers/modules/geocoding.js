////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 23/06/2020
// Updated on: 09/07/2020
//
// Version: 0.3.0-ol
////////////////////////////////////////////
/*

Geocoding testing suite. Uses Nominatim as default, but in the future will be
able to be changed to others geocodings.

////////////////////////////////////////////

Version 0.3.0 notes
 - Reverse geocoding added to both OpenCage and Nominatim. Nominatim also has
   now a country filter.

Version 0.2.0 notes
 - Can use opencage geocoder (with a dev KEY)

Version 0.1.1 notes
 - Now the call uses a https protocol.

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import {
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { defaultGeocodingValues } from '../../common/defaultConfig/defaultConfig.js'

import { fetchJson } from '../../common/modules/fetchJson.js'

/**
 *
 * @param {object}  inputConfig               The input parameters object.
 * @param {object}  inputConfig.type          The type of geocoding.
 * @param {string}  inputConfig.address       The address to look for.
 * @param {number}  inputConfig.position      The array with a position in longitude & latitude.
 * @param {number}  inputConfig.candidates    The number of candidates that will be return.
 * @param {string}  inputConfig.geocoder      The geocoder to use.
 * @param {string}  inputConfig.key           The geocoder token.
 * @param {string}  inputConfig.countryCode   The country code to fence the search.
 *
 * @return {array}   Return the list of candidates, each one as an object with name, position and zoom value.
 *
 * @example
 * geocoding({
 *   geocoder: 'opencage',
 *   key: 'as45fdmasi54mas05kg9673bhd'
 *   address: 'Calle del Alba',
 *   candidates: 5,
 *   countryCode: 'es'
 * })
 *
 * geocoding({
 *   type: 'reverse',
 *   position: -6.358130872249603, 39.49344593264895,
 * })
 */
export const geocoding = async inputConfig => {
  /** Get the type of geocoding to do: normal or reverse */
  const type = checkInputConfigString(inputConfig, 'type')
    ? inputConfig.type
    : defaultGeocodingValues.type

  /** Get the address from the input */
  const address = checkInputConfigString(inputConfig, 'address')
    ? inputConfig.address
    : undefined

  /** Get the address from the input */
  let position = checkInputConfigString(inputConfig, 'position')
    ? inputConfig.position
    : undefined

  /** Check if the input address or position is defined */
  if ((type === 'address' && !address) || (type === 'reverse' && !position))
    return

  if (type === 'reverse') {
    position = [
      position.replace(' ', '').split(',')[0],
      position.replace(' ', '').split(',')[1]
    ]
  }

  /** Get the address from the input */
  const geocoder = checkInputConfigString(inputConfig, 'geocoder')
    ? inputConfig.geocoder.toLowerCase()
    : defaultGeocodingValues.geocoder

  /** Get the number of candidates to return */
  const candidates = checkInputConfigNumber(inputConfig, 'candidates')
    ? inputConfig.candidates
    : defaultGeocodingValues.candidates

  /** Get the geocoder token */
  const key = checkInputConfigString(inputConfig, 'key')
    ? inputConfig.key
    : defaultGeocodingValues.key

  /** Get the geocoder token */
  const countryCode = checkInputConfigString(inputConfig, 'countryCode')
    ? inputConfig.countryCode
    : undefined

  /** Launch the appropiate geocoder method */
  switch (geocoder) {
    case 'opencage':
      return await openCageGeocoder({
        type: type,
        address: address,
        position: position,
        candidates: candidates,
        key: key,
        countryCode: countryCode
      })
      break
    default:
      return nominatimGeocoder({
        type: type,
        address: address,
        position: position,
        candidates: candidates,
        countryCode: countryCode
      })
      break
  }
}

/** METHODS */

/**
 * 
 * @param {object}    inputConfig              The input parameters object.
 * @param {string}    inputConfig.address      The address to look for.
 * @param {candidates}    inputConfig.address      The address to look for.
 * 
 * @example
 * openCageGeocoder({
    address: address,
    candidates: candidates,
    key: key,
    countryCode: countryCode
  })
 */
const openCageGeocoder = async inputConfig => {
  /** Check if the key exists */
  if (!inputConfig.key) return

  /** Set the type of geocoding */
  const type = inputConfig.type

  /** Set the address or position to look */
  const address =
    type === 'reverse'
      ? [inputConfig.position[1], inputConfig.position[0]]
      : inputConfig.address

  /** Set the number of candidates to return */
  const candidates = inputConfig.candidates

  /** Retrieve the service key */
  const key = inputConfig.key

  /** Get the country code */
  const countryCode = inputConfig.countryCode

  /** Create the URL call */
  let requestURL = 'https://api.opencagedata.com/geocode/v1/json?'
  requestURL += '&key=' + key
  requestURL += '&q=' + address
  requestURL += '&limit=' + candidates
  if (countryCode) requestURL += '&countrycode=' + countryCode

  /** Make  */
  return await fetchJson(requestURL).then(candidates => {
    /** Aim for the array of results */
    candidates = candidates = candidates.results

    /** Set a variable to store the candidates */
    const candidatesList = []

    /** Iterate each candidate to get the request data */
    candidates.forEach(candidate => {
      candidatesList.push({
        name: candidate.formatted,
        position: [candidate.geometry.lng, candidate.geometry.lat],
        zoom: defaultGeocodingValues.zoom,
        extent: [
          candidate.bounds.southwest.lng,
          candidate.bounds.southwest.lat,
          candidate.bounds.northeast.lng,
          candidate.bounds.northeast.lat
        ]
      })
    })

    return candidatesList
  })
}

const nominatimGeocoder = async inputConfig => {
  /** Set the type of geocoding */
  const type = inputConfig.type

  /** Set the address or position to look */
  const address =
    type === 'reverse'
      ? [inputConfig.position[1], inputConfig.position[0]]
      : inputConfig.address

  /** Set the number of candidates to return */
  const candidates = inputConfig.candidates

  /** Get the country code */
  const countryCode = inputConfig.countryCode

  /** Create the URL call */
  let requestURL =
    type === 'address'
      ? 'https://nominatim.openstreetmap.org/search?'
      : 'https://nominatim.openstreetmap.org/reverse?'
  requestURL += '&limit=' + candidates

  if (type === 'address') {
    requestURL += '&format=' + 'json'
    requestURL += '&q=' + address
    if (countryCode) requestURL += '&country=' + countryCode
  } else {
    requestURL += '&format=' + 'json'
    requestURL += '&lon=' + inputConfig.position[0]
    requestURL += '&lat=' + inputConfig.position[1]
  }

  /** Send a call to the API making a promise and await until get the responde
   * to return the result */
  return await fetch(requestURL)
    .then(response => {
      return response.json()
    })
    .then(candidates => {
      /** Set a variable to store the candidates */
      const candidatesList = []

      /** Check if the candidates are only one */
      if (!Array.isArray(candidates)) {
        candidates = [candidates]
      }

      /** For each candidate, append it to the list with the position, zoom and
       * extent previously transformed */
      candidates.forEach(candidate => {
        const extent = ol.proj.transformExtent(
          [
            parseFloat(candidate.boundingbox[2]),
            parseFloat(candidate.boundingbox[1]),
            parseFloat(candidate.boundingbox[3]),
            parseFloat(candidate.boundingbox[0])
          ],
          'EPSG:4326',
          'EPSG:3857'
        )

        candidatesList.push({
          name: candidate.display_name,
          position: [parseFloat(candidate.lon), parseFloat(candidate.lat)],
          zoom: defaultGeocodingValues.zoom,
          extent: extent
        })
      })

      return candidatesList
    })
}

////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 23/06/2020
// Updated on: 09/07/2020
//
// Version: 0.2.0
////////////////////////////////////////////
/*

Fetch an url asynchronously an return the result in JSON format.

*/
////////////////////////////////////////////

export const fetchJson = async url => {
  /** Check if input URL exists */
  if (!url) return

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.warn(
      "There was an error trying to fetch the following URL: '" + url + "'."
    )
  }
}

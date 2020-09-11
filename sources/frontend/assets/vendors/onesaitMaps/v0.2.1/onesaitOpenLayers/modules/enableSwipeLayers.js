////////////////////////////////////////////
// Created by: fjlacevedo
// Created on: 02/09/2020
//
// Version: 1.0.0-ol
////////////////////////////////////////////
/*

*****

*/
////////////////////////////////////////////

/** Import the necessary libraries */
import {
  checkInputConfigNumber,
  checkInputConfigString
} from '../../common/modules/checkInputConfigProperties.js'
import { checkInputConfigLayer } from './checkInputConfigLayer.js'
import { getMapLayerByName } from './getMapLayerByName.js'
import { getActiveMap } from './getActiveMap.js'

/**
 *
 * @param {object}   inputConfig         The input parameters object.
 * @param {string}   inputConfig.div     The targeted layer.
 * @param {object}   inputConfig.layer   The targeted layer.
 * @param {object}   inputConfig.map     The value to identify the entity.
 */
export const enableSwipeLayers = inputConfig => {
  /** Get the active map */
  const map = getActiveMap(inputConfig)

  /** Get the layer */
  const layer = checkInputConfigLayer(inputConfig)
    ? inputConfig.layer
    : undefined

  /** Get the swipe bar */
  const swipe = checkInputConfigString(inputConfig, 'div')
    ? document.getElementById(inputConfig.div)
    : undefined

  /** Check if the swipe bar exist. If not, end the function */
  if (!layer || !swipe) return

  console.log('Vamoss')

  layer.on('prerender', event => {
    var ctx = event.context
    var mapSize = map.getSize()
    var width = mapSize[0] * (swipe.value / 100)
    var tl = ol.render.getRenderPixel(event, [width, 0])
    var tr = ol.render.getRenderPixel(event, [mapSize[0], 0])
    var bl = ol.render.getRenderPixel(event, [width, mapSize[1]])
    var br = ol.render.getRenderPixel(event, mapSize)

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(tl[0], tl[1])
    ctx.lineTo(bl[0], bl[1])
    ctx.lineTo(br[0], br[1])
    ctx.lineTo(tr[0], tr[1])
    ctx.closePath()
    ctx.clip()
  })

  layer.on('postrender', function (event) {
    var ctx = event.context
    ctx.restore()
  })

  swipe.addEventListener(
    'input',
    () => {
      map.render()
    },
    false
  )
}

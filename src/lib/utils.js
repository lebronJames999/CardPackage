import wepy from 'wepy'
import {
  postJson
} from '../lib/request'
const _MIN_WIDTH = 10
const _MAX_WIDTH = 100
const _MIN_HEIGHT = 10
const _MAX_HEIGHT = 100

export const getImageStyle = ({w, h} = {}) => {
  if (!w || !h) return ''

  let _width = w
  let _height = h

  // TODO

  let style = `width: ${_width}rpx; height: ${_height}rpx;`
  console.log(style)

  return style
}

const _s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

export const guid = () => `${_s4()}${_s4()}-${_s4()}-${_s4()}-${_s4()}-${_s4()}${_s4()}${_s4()}`

export const shortGuid = () => `${_s4()}${_s4()}${_s4()}`

export const noLineGuid = () => `${_s4()}${_s4()}${_s4()}${_s4()}${_s4()}${_s4()}${_s4()}${_s4()}`;

const _padStart = (num, len = 2, ch = '0') => {
  let output = `${num}`

  while (output.length < len) {
    output = `${ch}${output}`
  }
  return output
}

export const Formatter = {
  format: (millis, formatStr = 'YYYY-MM-DD') => {
    const d = new Date(millis)

    return formatStr
      .replace('YYYY', d.getFullYear())
      .replace('MM', _padStart(d.getMonth() + 1))
      .replace('DD', _padStart(d.getDate()))
      .replace('HH', _padStart(d.getHours()))
      .replace('mm', _padStart(d.getMinutes()))
  }
}

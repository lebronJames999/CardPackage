import wepy from 'wepy'
import config from '../config'

const request = (method = 'GET', _headers) => {
  return async ({url, data, headers}) => {
    if (url.indexOf('/') === 0) {
      url = config.baseUrl + url
    }

    const __headers = {
      ..._headers,
      ...config.headers,
      ...headers
    }

    console.log('header----:', __headers)

    let response = await wepy.request({
      url: url,
      data: data,
      header: __headers,
      method: method
    })

    if (response.statusCode === 200) {
      return response.data
    } else throw response
  }
}

export const get = request('GET')
export const post = request('POST', {'Content-Type': 'application/x-www-form-urlencoded'})
export const postJson = request('POST', { 'Content-Type': 'application/json' })

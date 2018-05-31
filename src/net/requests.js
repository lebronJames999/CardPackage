import wepy from 'wepy'
import {
  get,
  post,
  postJson
} from '../lib/request'

import config from '../config'

// export const postFormIds = async () => {
//   try {
//     let formIds = await getFormIds()
//     if (formIds && formIds.length > 0) {
//       postJson({url: '/formid', data: formIds})
//         .then(response => {
//           console.log(response)
//         })
//         .catch(e => {
//           console.log(e)
//         })
//     }
//   } catch (e) {
//     console.log(e)
//   }s
// }

export const authorize = (data) => postJson({url: '/authorize', data: data})
export const userinfo = (data, headers) => postJson({url: '/userinfo', data: data, headers: headers})
export const log = (data) => postJson({url: '/log', data: data})
export const messages = ({ doctorId, data }) => get({url: `/doctor/${doctorId}/messages`, data: data})
export const doctors = () => get({url: '/doctors'})
export const sign = () => get({url: '/filecloud/sign'})

export const addDoctor = (doctorId, data) => postJson({
  url: `/doctor/${doctorId}/patientinfo`,
  data
})

export const fetchDoctor = (doctorId) => get({
  url: `/doctor/${doctorId}/patientinfo`
})

export const fetchCards = () => get({ url: `/paycard/list/${config.customerId}` });

export const fetchShops = () => get({ url: `/shop/list` });

export const fetchQNToken = (key) => get({ url: `/qiniu/token?fileKey=${key}` });

export const createCard = param => postJson({
  data: {
    ...param,
    customerId: config.customerId
  },
  url: '/paycard/create'
});

export const updateCard = param => postJson({
  url: '/paycard/update',
  data: {
    ...param,
    customerId: config.customerId
  }
});

export const fetchOrders = param => {
  const orderQuery = param.lastOrderNo ? `?lastOrderNo=${param.lastOrderNo}` : ''
  const searchQuery = param.productName ? `productName=${param.productName}` : '';

  const queryStr = orderQuery.length ? orderQuery + '&' + searchQuery : searchQuery.length ? '?' + searchQuery : ''
  return get({ url: `/order/list/${config.customerId}${queryStr}` });
  // return get({ url: `order/list/${config.customerId}${queryStr}` });
}

export const genChargeOrder = param => postJson({
  url: '/paycard/recharge',
  data: {
    ...param,
    customerId: config.customerId,
    customerName: config.name,
    customerPhone: config.phone || '',
    openId: config.openId
  }
});

export const fetchOrderDetail = orderNo => get({
  url: `/order/detail/${config.customerId}/${orderNo}`
});
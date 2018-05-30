
import wepy from 'wepy'
// import log from './log'
import config from '../config'
import {
  userinfo,
  authorize
} from './requests'
import {
  setUser,
  getUser
} from '../storage'

import { saveUser } from "../store/actions"
import { getStore } from 'wepy-redux';
const store = getStore();

const _onUser = (user, shouldSaveIt = false) => {
  Object.assign(config, user)
  Object.assign(config.headers, {
    token: user.token,
    customerId: user.customerId
  })

  if (shouldSaveIt) {
    setUser(user)
    store.dispatch(saveUser()) 
  }
}

export const register = async (info) => {
  try {
    let response = await userinfo({
      ...info,
      openId: config.openId
    })

    if (!response.code === 200) {
      throw response
    }

    const customer = response.data

    if (!customer.name) {
      throw response
    }

    _onUser(customer, true)
  } catch (e) {
    throw e
  }
}

export const auth = async () => {
  console.log('++++++++++auth-begin++++++++++')

  // step.1 检查Session 是否过期
  // step.2 Session未过期时，检查本地保存的User
  let user
  try {
     await wepy.checkSession()
    user = await getUser()
  } catch (e) {
    console.log(e)
  }

  if (user) {
    console.log('++++++++++auth-end++++++++++')
    _onUser(user)
    return {success: true}
  }

  // step.3 登录获取code
  try {
    let login = await wepy.login()
    console.log('WX.login: ', login)

    // step.4 换取Token、SessionKey 等
    let response = await authorize({code: login.code})
    console.log('Auth-authorize:', response)

    if (!response.code === 200) {
      throw response
    }

    const customer = response.data
    const token = customer.token

    if (!token) {
      throw response
    }

    if (customer.name) {
      _onUser(customer, true);
      return { success: true };
    }

    _onUser(customer);
    return {success: false}
  } catch (e) {
    throw e
  }
}

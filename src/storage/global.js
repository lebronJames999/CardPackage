import {getUser, setUser} from './index'

// cache
export default {

  getUserInfo () {
    // let userInfo = getUser();
    // if (userInfo) {
    //   console.log('2222:'+userInfo)
    //   return userInfo
    // }
    return this._userInfo
  },
  setUserInfo (v) {
    this._userInfo = v

    // setUser(this._userInfo)
  },

  getPhoneNumber () {
    return this._phoneNumber
  },

  setPhoneNumber (v) {
    this._phoneNumber = v
  }
}

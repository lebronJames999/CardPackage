import wepy from 'wepy'
import {
  KEY_USER,
  KEY_FORM_IDS,
  KEY_DOCTORS,
  KEY_SINGS
} from './keys'
export * from './keys'

export const setString = (key, data) => wepy.setStorage({key, data})

export const getString = async (key) => {
  try {
    let str = await wepy.getStorage({key})
    if (str && str.data) {
      return str.data
    }
  } catch (e) {
    console.log(e)
  }
}

export const remove = (key) => wepy.removeStorage({key})

export const setObject = (key, data) => setString(key, JSON.stringify(data))

export const getObject = async (key) => {
  let str = await getString(key)
  if (str) {
    return JSON.parse(str)
  }
}

export const getUser = () => getObject(KEY_USER)


export const setUser = (user) => setObject(KEY_USER, user)

export const getUserSync = () => {
  try {
    // wx 同步获取保存的用户
    let userJsonStr = wx.getStorageSync(KEY_USER)
    if (userJsonStr) {
      const user = JSON.parse(userJsonStr)
      return user
    }
  } catch (e) {
    // TODO
  }
}

export const getFormIds = async () => {
  try {
    let formIds = await getObject(KEY_FORM_IDS)
    if (formIds) return formIds
  } catch (e) {
    console.log(e)
  }
  return null
}

export const clearFormIds = async () => {
  try {
    await remove(KEY_FORM_IDS)
  } catch (e) {
    console.log(e)
  }
}

export const saveFormId = async (formId) => {
  let formIds = null
  try {
    formIds = await getObject(KEY_FORM_IDS)
  } catch (e) {
    formIds = []
  }

  if (!formIds) formIds = []
  formIds.push(formId)

  console.log(formIds)
  try {
    await setObject(KEY_FORM_IDS, formIds)
  } catch (e) {
    console.log(e)
  }
}

export const getDoctorVO = async (doctorId) => {
  try {
    let doctorVOs = await getObject(KEY_DOCTORS)
    if (doctorVOs) {
      return doctorVOs[doctorId]
    }
  } catch (e) {
    console.log(e)
  }
}

export const saveDoctorVO = async (doctorVO) => {
  let doctorVOs = null
  try {
    doctorVOs = await getObject(KEY_DOCTORS)
  } catch (e) {
    console.log(e)
  }

  if (!doctorVOs) {
    doctorVOs = {}
  }

  doctorVOs[doctorVO.doctorId] = doctorVO

  try {
    await setObject(KEY_DOCTORS, doctorVOs)
  } catch (e) {
    console.log(e)
  }
}

export const saveSigns = (signs) => {
  return setObject(KEY_SINGS, signs)
}

export const getSigns = (signs) => {
  return getObject(KEY_SINGS)
}

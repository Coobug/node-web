import axiosApi from '@/axios/config'

/**
 * 获取图片验证码
 * @param {Obj} params          参数
 *              params.width    验证码图片宽度
 *              params.height   验证码图片高度
 * @param {Fn} cb 回调函数
 * @return
 */
export const getCaptcha = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/service/captcha',
      method: 'get'
    },
    params
  )
}

/**
 * 上传文件
 * @param {Obj} params          参数
 * @return
 */
export const uploadFiles = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/upload',
      method: 'post'
    },
    params
  )
}

/**
 * 获取banner
 */
export const getBanner = params => {
  return axiosApi.httpServer(
    {
      url: '/blogapi/banner',
      method: 'get'
    },
    params
  )
}

import { apiHelper } from '../utils/helpers'

export default {
  postNoti: ({ formData }) => {
    return apiHelper.post('/notify', formData)
  },
  deleteNoti: ({ notiObjId }) => {
    return apiHelper.delete(`/notify/${notiObjId}`)
  }
}
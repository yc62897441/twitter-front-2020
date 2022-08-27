import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getConnectedUsers: () => {
    return apiHelper.get(`rooms/getConnectedUsers`)
  },
  createChatRoom: ({ formData }) => {
    return apiHelper.post(`rooms/createChatRoom`, formData)
  },
  updateUserUnreadNum: ({ formData }) => {
    return apiHelper.put(`rooms/updateUserUnreadNum`, formData)
  }
}
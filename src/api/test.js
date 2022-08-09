import { apiHelper } from '../utils/helpers'

export default {
  postTest: ({ formData }) => {
    return apiHelper.post('/test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}
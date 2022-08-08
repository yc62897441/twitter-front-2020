import { apiHelper } from '../utils/helpers'

export default {
  postTest: ({ formData }) => {
    return apiHelper.post('/test', formData, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
  },
}
import { apiHelper } from '../utils/helpers'

export default {
  getTweets: () => {
    return apiHelper.get('/tweets')
  },
}
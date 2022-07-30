import moment from "moment"

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return '-'
      }
      return moment(datetime).fromNow()
    },
    formatTime(datetime) {
      if (!datetime) {
        return '-'
      }
      return moment(datetime).format("h:mm a・YYYY MMMM D")
    }
  }
}
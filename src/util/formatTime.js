
import moment from "moment";
moment.locale('zh-cn');         // zh-cn

const formatTime = {
  getTime: (data) => {
    return moment(data).format('YYYY/MM/DD h:mm');
  }
}

export default formatTime
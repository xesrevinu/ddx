/**
 * Created by kee on 15/10/21.
 */
import axios from 'axios';
const host = __DEVELOPMENT__ ? '//localhost:3000/api' : '/api';

export default function apis({ url, method, ...others }) {
  return axios({
    url: host + url,
    method: method,
    ...others
  });
}

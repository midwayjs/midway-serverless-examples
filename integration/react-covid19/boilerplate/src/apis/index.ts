import { Provide, Func } from '@midwayjs/decorator'
import Axios from 'axios';
@Provide()
export class IndexService {

  @Func('index.handler')
  async handler() {
    return Axios({
      url: 'https://lab.isaaclin.cn/nCoV/api/area'
    }).then(response => {
      return response.data;
    });
    return {
      message: 'Hello Midway FaaS!',
    }
  }
}

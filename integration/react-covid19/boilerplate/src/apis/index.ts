import { Provide, Func } from '@midwayjs/decorator'
import Axios from 'axios';

let cacheResult: any;

@Provide()
export class IndexService {

  @Func('index.handler')
  async handler() {
    if (!cacheResult) {
      cacheResult = await Axios({
        url: 'https://lab.isaaclin.cn/nCoV/api/area'
      }).then(response => {
        return response.data;
      });
    }
    return cacheResult;
  }
}

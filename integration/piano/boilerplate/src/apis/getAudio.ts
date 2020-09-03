import { Provide, Func, Inject } from '@midwayjs/decorator'

@Provide()
export class GetAudioService {

  @Inject()
  ctx;

  @Func('getAudio.handler')
  async handler() {
    let body = this.ctx.request.body;
    let url = './mp3/' +body['metre']+ '.mp3';
    return {
      url: url
    };
  }
}

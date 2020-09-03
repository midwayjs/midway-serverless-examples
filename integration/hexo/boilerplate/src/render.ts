import { Provide, Func, Inject } from '@midwayjs/decorator'
@Provide()
export class RenderService {

  @Inject()
  ctx;

  @Func('render.handler', { middleware: [ 'rewrite', 'fmw:staticFile' ]})
  async handler() {
    return '404 Error  Powered by Midway Serverless';
  }
}

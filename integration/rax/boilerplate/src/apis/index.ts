import { Provide, Func, Inject } from '@midwayjs/decorator';
import { FunctionHandler, FaaSContext, } from '@midwayjs/faas';

@Provide()
export class IndexHandler implements FunctionHandler {

  @Inject()
  ctx: FaaSContext;

  @Inject()
  baseDir;

  @Func('assets.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return `Cannot GET ${this.ctx.request.path}`;
  }

  @Func('index.handler')
  async handler(event: any): Promise<any> {
    return {
      stars: 10000
    };
  }
}

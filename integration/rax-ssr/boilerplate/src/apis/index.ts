import { Provide, Func, Inject, Config } from '@midwayjs/decorator';
import { FunctionHandler, FaaSContext, } from '@midwayjs/faas';
import { join } from 'path';

@Provide()
export class IndexHandler implements FunctionHandler {

  @Inject()
  ctx: FaaSContext;

  @Inject()
  baseDir;

  @Config('ssrConfig')
  ssrConfig;

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

  @Func('home.handler')
  async homeHandler(event: any): Promise<any> {
    const homeRender = require(join(this.ssrConfig.dir, '/index.js'));
    await homeRender.renderWithContext(this.ctx);
  }
}

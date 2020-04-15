import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext, FunctionHandler} from '@midwayjs/faas';

@Provide()
@Func('index.handler')
export class IndexService implements FunctionHandler {

  @Inject()
  ctx: FaaSContext;  // context

  async handler() {
    this.ctx.set('x-midway-faas-type', '444444')
    return {
      headers: this.ctx.headers,
      method: this.ctx.method,
      path: this.ctx.path,
      body: this.ctx.request.body,
      params: this.ctx.params
    }
  }
}
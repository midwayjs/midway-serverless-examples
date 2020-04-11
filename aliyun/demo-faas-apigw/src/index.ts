import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext, FunctionHandler } from '@midwayjs/faas';

@Provide()
@Func('index.handler')
export class IndexService implements FunctionHandler {

  @Inject()
  ctx: FaaSContext;  // context

  async handler() {
    return 'hello world';
  }
}
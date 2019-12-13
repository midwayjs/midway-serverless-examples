import { FaaSContext, func, inject, provide } from '@midwayjs/faas';

@provide()
@func('index.handler')
export class IndexService {

  @inject()
  ctx: FaaSContext;  // context

  async handler() {
    return 'index.handler';
  }
}

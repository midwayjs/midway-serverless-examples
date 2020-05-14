import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext } from '@midwayjs/faas';

@Provide()
export class APIService {

  @Inject()
  ctx: FaaSContext;  // context

  @Func('index.get')
  async get() {
    return this.ctx.path;
  }

  @Func('index.post')
  async post() {
    return this.ctx.method;
  }

  @Func('index.put')
  async put() {
    return this.ctx.method;
  }

  @Func('index.del')
  async del() {
    return this.ctx.method;
  }

  @Func('index.head')
  async head() {
    return this.ctx.method;
  }

  @Func('index.all')
  async all() {
    return this.ctx.method;
  }
}
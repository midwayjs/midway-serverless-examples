import { Provide, Func, Inject, Plugin } from '@midwayjs/decorator';
import { FunctionHandler, FaaSContext } from '@midwayjs/faas';

import * as assert from 'assert';

@Provide()
@Func('index.handler')
export class DBServiceHandler implements FunctionHandler {

  @Inject()
  ctx: FaaSContext &  { mysql: any};

  @Plugin()
  mysql: any;

  /**
   * @param event
   */
  async handler() {
    // 这里可以拿到全局的 egg-mysql 实例
    assert(this.mysql);
    // 这里可以拿到 ctx 上的 mysql
    assert(this.ctx.mysql.query);

    this.ctx.body = {
      msg: 'mysql connection complete'
    };
  }
}

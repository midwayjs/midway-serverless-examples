import { FaaSContext } from '@midwayjs/faas';
import { Func, Inject, Provide } from '@midwayjs/decorator';
import { readFileSync } from 'fs';
import { join } from 'path';
@Provide()
export class IndexService {

  @Inject()
  ctx: FaaSContext;  // context

  @Inject()
  baseDir: string;

  @Func('index.handler')
  async handler() {
    this.ctx.type = 'image/png';
    this.ctx.body = readFileSync(join(this.baseDir, '../public/midway.png'));
  }
}

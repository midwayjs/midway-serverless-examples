import { FaaSContext, SCF } from '@midwayjs/faas';
import { Func, Inject, Provide } from '@midwayjs/decorator';

@Provide()
export class CMQTriggerTest {

  @Inject()
  ctx: FaaSContext;

  @Func('mq.handler')
  async cronHandler(event: SCF.CMQEvent) {
    return 'hello world';
  }
}

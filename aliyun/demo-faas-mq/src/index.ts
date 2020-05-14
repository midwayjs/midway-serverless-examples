import { FaaSContext, FC } from '@midwayjs/faas';
import { Func, Inject, Provide } from '@midwayjs/decorator';

@Provide()
export class TimerTriggerTest {

  @Inject()
  ctx: FaaSContext;

  @Func('mq.handler')
  async cronHandler(event: FC.MNSEvent) {
    return 'hello world';
  }
}

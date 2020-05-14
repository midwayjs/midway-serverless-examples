import { FaaSContext, FC } from '@midwayjs/faas';
import {  Func, Inject, Provide } from '@midwayjs/decorator';

@Provide()
export class TimerTriggerTest {

  @Inject()
  ctx: FaaSContext;  // context

  @Func('every.handler')
  async everyHandler(event: FC.TimerEvent) {
    return 'hello world';
  }

  @Func('cron.handler')
  async cronHandler(event: FC.TimerEvent) {
    return 'hello world';
  }
}

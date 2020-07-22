import { Configuration, Plugin } from '@midwayjs/decorator';
import * as assert from 'assert';

@Configuration({
  imports: ['@midwayjs-component/egg'],
  importConfigs: [
    './config/'
  ]
})
export class ContainerConfiguration {

  @Plugin()
  mysql;

  async onReady() {
    // 这里可以拿到 egg-mysql 实例
    assert(this.mysql);
  }
}
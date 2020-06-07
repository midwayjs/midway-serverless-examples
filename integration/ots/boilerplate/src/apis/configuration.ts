import { Configuration, Config } from '@midwayjs/decorator';
import TableStore from 'tablestore';

@Configuration({
  importConfigs: [
    './config/config.default'
  ],
  imports: [
    '@midwayjs/faas-middleware-static-file'
  ]
})
export class ContainerConfiguration {

  @Config()
  tbConfig

  async onReady(container) {
    const tb =  new TableStore.Client({
      accessKeyId: this.tbConfig.accessKeyId,
      secretAccessKey: this.tbConfig.secretAccessKey,
      endpoint: this.tbConfig.endpoint,
      instancename: this.tbConfig.instancename,
      maxRetries: 20
    });
    container.registerObject('tb', tb);
  }
}
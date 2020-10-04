import { Configuration, Config } from '@midwayjs/decorator';
import TableStore from 'tablestore';
const nodemailer = require("nodemailer");

@Configuration({
  importConfigs: [
    './config/'
  ],
  imports: [
    '@midwayjs/faas-middleware-static-file'
  ]
})
export class ContainerConfiguration {

  @Config()
  tbConfig

  @Config()
  commitConfig;

  async onReady(container) {
    const tb =  new TableStore.Client({
      accessKeyId: this.tbConfig.accessKeyId,
      secretAccessKey: this.tbConfig.secretAccessKey,
      endpoint: this.tbConfig.endpoint,
      instancename: this.tbConfig.instancename,
      maxRetries: 20
    });
    container.registerObject('tb', tb);


    const mailer = nodemailer.createTransport(this.commitConfig.mailer);
    container.registerObject('mailer', mailer);
  }
}
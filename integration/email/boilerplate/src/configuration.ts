import { Configuration, Config } from '@midwayjs/decorator';
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
  commitConfig;

  async onReady(container) {

    const mailer = nodemailer.createTransport(this.commitConfig.mailer);
    container.registerObject('mailer', mailer);
  }
}
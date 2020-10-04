import { Func, Inject, Provide } from '@midwayjs/decorator';
@Provide()
export class EmailService {

  @Inject()
  ctx;

  @Inject()
  mailer;

  @Func('email.send')
  async handler() {
    const { email, title, text } = this.ctx.request.body;
    return this.mail(email, title || 'demo midway', text);
  }

  async mail(mailto, title, message) {
    try {
      await this.mailer.sendMail({
        from: `"Midway Demo" <notice@iwenku.net>`, // sender address
        to: mailto,
        subject: title,
        html: `<div style="position: relative;padding: 12px;">
          <div style="position: relative;padding: 12px 0;text-align: center;background-color: #f5f5f5;font-size: 12px;color: #b3b3b3;">由Midway Email示例发送，<b>为非真实内容</b>，更多示例请访问 <a href="http://demo.midwayjs.org">Midway Gallery</a>，请勿回复</div>
          <div>${(message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>`
      });
      return {
        success: true
      };
    } catch (e) {
      return {
        success: false,
        err: e.message
      };
    }
  }

  @Func('render.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Powered by Midway Serverless';
  }
}

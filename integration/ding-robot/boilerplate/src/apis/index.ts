import { Provide, Func, Inject } from '@midwayjs/decorator';
import fetch from 'node-fetch';
@Provide()
export class APIService {

  @Inject()
  ctx: any;

  @Func('api.render', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Building... Please refresh this page later.';
  }

  @Func('api.send')
  async send() {
    const { title, content, hooks } = this.ctx.request.body;
    if (!hooks || !hooks.length) {
      return {
        success: false,
        message: 'need hooks'
      };
    }

    const message = `## ${title}
---

${content || ''}
---
+ Powered by [Midway Serverless](https://github.com/midwayjs/midway/) 
`;
    console.log(this.ctx.request.body, fetch);
    return Promise.all(hooks.map((hook: string) => {
      return this.request(title, message, hook);
    }));
  }

  async request(title: string, text: string, hook: string) {
    const response = await fetch(hook, {
      method: 'post',
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: {
          title: title || 'midway',
          text
        },
        at: {
          "isAtAll": false
        }
      }),
      headers: {'Content-Type': 'application/json'}
    });
    return response
  }
}

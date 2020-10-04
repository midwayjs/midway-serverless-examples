import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: '/',
    dir: join(appInfo.baseDir, '../static'),
  };

  exports.commitConfig = {
    admin: process.env.MIDWAY_COMADMIN, // 管理员的email，收到评论时会向这个email发送邮件
    limitTime: 20000, // 单ip限流毫秒
    mailer: {
      host: "smtp.exmail.qq.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
      }
    }
  };
  return exports;
};
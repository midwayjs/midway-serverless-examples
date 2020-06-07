import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: '/',
    dir: join(appInfo.baseDir, '../build'),
  };

  exports.tbConfig = {
    accessKeyId: process.env.MIDWAY_OTS_ACCESSKEY,
    secretAccessKey: process.env.MIDWAY_OTS_SECRET,
    endpoint: process.env.MIDWAY_OTS_ENDPOINT, // e.g. https://todo-test-list.cn-hangzhou.ots.aliyuncs.com
    instancename: process.env.MIDWAY_OTS_INSTANCE // e.g. todo-test-list
  };
  return exports;
};
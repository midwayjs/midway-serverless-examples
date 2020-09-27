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
    endpoint: process.env.MIDWAY_OTS_ENDPOINT,
    instancename: process.env.MIDWAY_OTS_INSTANCE
  };
  return exports;
};
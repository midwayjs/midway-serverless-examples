import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: '/web',
    dir: join(appInfo.baseDir, '../build/web'),
  };

  exports.ssrConfig = {
    dir: join(appInfo.baseDir, '../build/node'),
  };
  
  return exports;
};

import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.static = {
    prefix: '/',
    dir: join(appInfo.baseDir, '../build'),
    dynamic: true,
    preload: false,
    buffer: true,
    maxFiles: 1000,
  };
  return exports;
};
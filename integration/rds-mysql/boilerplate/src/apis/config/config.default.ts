import { join } from 'path';

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: '/',
    dir: join(appInfo.baseDir, '../build'),
  };

  exports.dbConfig = {
    host: process.env.MIDWAY_RDS_HOST,
    port: process.env.MIDWAY_RDS_PORT || 3306,
    database: process.env.MIDWAY_RDS_DBNAME,
    username: process.env.MIDWAY_RDS_USERNAME,
    password: process.env.MIDWAY_RDS_PASSWORD
  };
  return exports;
};
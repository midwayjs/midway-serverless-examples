import { Configuration, Config } from '@midwayjs/decorator';
import { Sequelize } from 'sequelize';
import "mysql2";

@Configuration({
  importConfigs: [
    './config/config.default'
  ],
  imports: [
    '@midwayjs/faas-middleware-static-file'
  ]
})
export class ContainerConfiguration {

  @Config()
  dbConfig

  async onReady(container) {
    const db = new Sequelize(this.dbConfig.database, this.dbConfig.username, this.dbConfig.password, {
      host: this.dbConfig.host,
      port: this.dbConfig.port,
      logging: console.log,
      dialect: 'mysql',
      define: { charset: 'utf8' },
      timezone: '+08:00'
    });
    try {
      await db.authenticate();
    } catch(error) {
      console.log('error', error)
      error.message = `db connect error: ${error.message}`;
      throw error;
    }
    container.registerObject('db', db);
  }
}
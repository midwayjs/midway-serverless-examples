import { Func, Inject, Provide, Config } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';
import OTSWhere from 'otswhere';
import md5Hex from 'md5-hex';
@Provide()
export class CommentService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Config()
  commitConfig;

  @Config()
  tbConfig

  @Inject()
  mailer;

  @Func('commit.add')
  async handler() {
    const isLimit = await this.isLimit();
    if (isLimit) {
      return {
        success: false,
        errmsg: `${Math.ceil(this.commitConfig.limitTime / 1000)} s内仅允许提交一次`
      };
    }
    const { site, page, email, text, reply, nick, location = '', notice = 'email' } = this.ctx.request.body;

    const attributeColumns: any = [
      { email },
      { text },
      { createTime: Date.now() + ''},
      { location },
      { status: 'notcheck' },
      { avatar: md5Hex(email) },
      { notice },
    ];

    if (nick) {
      attributeColumns.push({ nick });
    }

    if (reply) {
      const [rsite, rpage, rid] = reply.split(':');
      if (rsite != site || rpage != page) {
        throw new Error('only reply current list');
      }
      attributeColumns.push({reply});
      try {
        const preInfo: any = await this.getCommit(rsite, rpage, rid);
        await this.mail(preInfo.email, '【提醒】您的评论有人回复了，请查阅', `
          用户“${nick || '匿名'}” 在<br />
          <a href="${location}" target="_blank">${location}</a><br />
          回复说：<br />
          “${text}”。<br />
          回复时间：${new Date()}
          <br /><hr /><br />
          您之前使用昵称“${preInfo.nick || '匿名'}”评论的内容为: “${preInfo.text}”。<br />
          评论时间：${new Date(preInfo.createTime - 0)}
          `
        );
      } catch(e) {}
    }
    
    
    const params = {
      tableName: this.tbConfig.tableName,
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { site },
        { page },
        { id: TableStore.PK_AUTO_INCR },
      ],
      attributeColumns
    };
    if (this.commitConfig.admin) {
      await this.mail(this.commitConfig.admin, '新的评论信息', `
        ${nick || '匿名'}&lt;${email}&gt; 在<br />
        <a href="${location}" target="_blank">${location}</a>  <br />
        评论说：“${text}”。`
      );
    }
    
    return new Promise(resolve => {
      this.tb.putRow(params, async function (err, data) {
        if (err) {
          resolve({
            success: false,
            errmsg: err.message
          });
        } else {
          resolve({
            success: true
          });
        }
      });
    });
  }

  getCommit(site, page, id) {
    return new Promise(resolve => {
      this.tb.getRow({
        tableName: this.tbConfig.tableName,
        primaryKey: [{ site }, { page }, { id: TableStore.Long.fromString(id)}]
      }, (err, result) => {
        resolve(format.row(result.row));
      });
    });
  }

  async mail(mailto, title, message) {
    try {
      await this.mailer.sendMail({
        from: `"Notice" <notice@iwenku.net>`, // sender address
        to: mailto,
        subject: title,
        html: `<div style="position: relative;padding: 12px;">
          <div>${message || ''}</div>
          <div style="position: relative;padding: 12px 0;text-align: center;background-color: #f5f5f5;font-size: 12px;color: #b3b3b3;">此信件为系统自动发出，请勿回复</div>
        </div>`
      });
    } catch {
      //
    }
  }

  @Func('list.handler')
  async listHandler(): Promise<any> {
    const { site, page } = this.ctx.query;

    const params = {
        tableName: this.tbConfig.tableName,
        direction: TableStore.Direction.BACKWARD,
        inclusiveStartPrimaryKey: [{ site }, { page }, { id: TableStore.INF_MAX }],
        exclusiveEndPrimaryKey: [{ site }, { page }, { id: TableStore.INF_MIN }],
        columnFilter: OTSWhere('status!=hidden', { TableStore }) // where condition
    };
    return new Promise(resolve => {
      this.tb.getRange(params, function (err, data) {
        const rows = format.rows(data, { email: true });
        resolve(rows);
      });
    });
  }

  @Func('render.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Powered by Midway Serverless';
  }

  // 限流
  async isLimit() {
    // 不配置时间就不限流
    if (!this.commitConfig.limitTime) {
      return false;
    }
    const ip = this.ctx.ip;
    const now = Date.now();
    const tableName = `${this.tbConfig.tableName}_limit`;
    const ipInfo: any = await new Promise(resolve => {
      this.tb.getRow({
        tableName,
        primaryKey: [{ ip }]
      }, (err, result) => {
        
        if (err || !result || !result.row || !result.row.attributes) {
          resolve(false);
          return;
        }
        resolve(format.row(result.row));
      });
    });

    if (ipInfo) {
      const timediff = now - ipInfo.time;
      if (timediff < this.commitConfig.limitTime) {
        return true;
      }
    }
    const newData = [{ time: now }];
    await new Promise((resolve) => {
      this.tb[ipInfo ? 'updateRow': 'putRow']({
        tableName,
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
        primaryKey: [{ ip }],
        [ipInfo ? 'updateOfAttributeColumns': 'attributeColumns']: ipInfo ? [{ PUT: newData}] : newData
      }, function (err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    
    return false;
  }

}

import { Func, Inject, Provide } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';
@Provide()
export class TodoService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Func('todo.list')
  async handler() {
    const params = {
        tableName: 'list',
        direction: TableStore.Direction.BACKWARD,
        inclusiveStartPrimaryKey: [{ id: TableStore.INF_MAX }],
        exclusiveEndPrimaryKey: [{ id: TableStore.INF_MIN }]
    };
    return new Promise(resolve => {
      this.tb.getRange(params,  (_, data) => {
        const rows = format.rows(data, { email: true });
        resolve(rows);
      });
    })
  }

  @Func('todo.update')
  async update() {
    const { id, status, todo } = this.ctx.query;
    const params = {
      tableName: "list",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { 'id': id },
      ],
      attributeColumns: [
        { status },
        { todo }
      ]
    };
    return new Promise((resolve) => {
      this.tb.putRow(params, function (err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  @Func('todo.remove')
  async remove() {
    const { id } = this.ctx.query;

    const params = {
      tableName: "list",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [{ id }]
    };
    return new Promise(resolve => {
      this.tb.deleteRow(params, function (err, data) {
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

  @Func('todo.add')
  async add() {
    const { todo } = this.ctx.query;
    const params = {
      tableName: "list",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { id: `${Date.now()}-${Math.random()}` }
      ],
      attributeColumns: [
        { todo },
        { status: '1'}
      ]
    };
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

  @Func('render.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Please refresh this page later.';
  }

  slashes(str) {
    return str.replace(/'/g, '')
  }
}

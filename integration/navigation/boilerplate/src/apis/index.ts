import { Func, Inject, Provide } from '@midwayjs/decorator';
import TableStore from 'tablestore';
import format from 'otswhere/format';

const iconMap = {};
@Provide()
export class TodoService {

  @Inject()
  ctx;

  @Inject()
  tb;

  @Func('class.list')
  async handler() {
    const { userId } = this.ctx.query;
    const condition = new TableStore.CompositeCondition(TableStore.LogicalOperator.AND);
    condition.addSubCondition(new TableStore.SingleColumnCondition('userId', userId, TableStore.ComparatorType.EQUAL));
    condition.addSubCondition(new TableStore.SingleColumnCondition('status', 'active', TableStore.ComparatorType.EQUAL));
    const params = {
        tableName: 'demo_nav_class',
        direction: TableStore.Direction.BACKWARD,
        inclusiveStartPrimaryKey: [{ userId }, { id: TableStore.INF_MAX }],
        exclusiveEndPrimaryKey: [{ userId }, { id: TableStore.INF_MIN }],
        columnFilter: condition
    };
   
    return new Promise(resolve => {
      this.tb.getRange(params,  (_, data) => {
        const rows = format.rows(data);
        resolve(rows);
      });
    })
  }

  @Func('nav.list')
  async navList() {
    const { userId } = this.ctx.query;
    const condition = new TableStore.CompositeCondition(TableStore.LogicalOperator.AND);
    condition.addSubCondition(new TableStore.SingleColumnCondition('userId', userId, TableStore.ComparatorType.EQUAL));
    condition.addSubCondition(new TableStore.SingleColumnCondition('status', 'active', TableStore.ComparatorType.EQUAL));
    const params = {
        tableName: 'demo_nav_list',
        direction: TableStore.Direction.BACKWARD,
        inclusiveStartPrimaryKey: [{ userId }, { id: TableStore.INF_MAX }],
        exclusiveEndPrimaryKey: [{ userId }, { id: TableStore.INF_MIN }],
        columnFilter: condition
    };
    return new Promise(resolve => {
      this.tb.getRange(params,  (_, data) => {
        const rows = format.rows(data);
        resolve(rows);
      });
    })
  }

  @Func('nav.add')
  async navAdd() {
    const { userId, title, desc = '', link = '', icon = '', class: className, search = '', index = '1' } = this.ctx.request.body;
    let params = {
      tableName: "demo_nav_list",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { 'userId': userId },
        { 'id': TableStore.PK_AUTO_INCR },
      ],
      attributeColumns: [
        { title },
        { desc },
        { link },
        { class: className + '' },
        { status: 'active' },
        { index },
        { icon },
        { search }
      ]
    };
    return new Promise(resolve => {
      this.tb.putRow(params, function (err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  @Func('class.add')
  async classAdd() {
    const { userId, title, status = 'active', index = '1' } = this.ctx.request.body;
    let params = {
      tableName: "demo_nav_class",
      condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
      primaryKey: [
        { 'userId': userId },
        { 'id': TableStore.PK_AUTO_INCR },
      ],
      attributeColumns: [
        { title },
        { status },
        { index },
      ]
    };
    return new Promise(resolve => {
      this.tb.putRow(params, function (err, data) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  @Func('render.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Please refresh this page later.';
  }
}

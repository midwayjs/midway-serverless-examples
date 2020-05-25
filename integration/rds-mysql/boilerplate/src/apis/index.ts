import { Func, Inject, Provide } from '@midwayjs/decorator';
@Provide()
export class TodoService {

  @Inject()
  ctx;

  @Inject()
  db;

  @Func('todo.list')
  async handler() {
    const [todoList] = await this.db.query('select * from todo order by id desc limit 5');
    return todoList;
  }

  @Func('todo.update')
  async update() {
    const { id, status, todo } = this.ctx.query;
    return this.db.query(`update todo set status=${status - 0}, todo='${this.slashes(todo)}' where id=${id-0}`);
  }

  @Func('todo.remove')
  async remove() {
    const { id } = this.ctx.query;
    return this.db.query(`delete from todo where id=${id - 0}`);
  }

  @Func('todo.add')
  async add() {
    const { todo } = this.ctx.query;
    return await this.db.query(`insert into todo(todo,status) values('${this.slashes(todo)}', 1)`);
  }

  @Func('render.handler', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Please refresh this page later.';
  }

  slashes(str) {
    return str.replace(/'/g, '')
  }
}

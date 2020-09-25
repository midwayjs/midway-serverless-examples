import { Provide, Func } from '@midwayjs/decorator';

@Provide()
export class APIService {

  @Func('api.render', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Building... Please refresh this page later.';
  }

  @Func('api.list')
  async list() {
    return {
      list: [
        {
          key: '1',
          name: 'Midway Time',
          age: 32,
          data: new Date(),
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          data: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          data: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ]
    }
  }

}

import { Provide, Func } from '@midwayjs/decorator';

@Provide()
export class APIService {

  @Func('api.render', { middleware: [ 'fmw:staticFile' ]})
  async render() {
    return 'Building... Please refresh this page later.';
  }

  @Func('api.index')
  async index() {
    return {
      message: 'Hello Midway FaaS!',
    }
  }

  @Func('api.list')
  async list() {
    return {
      list: [
        {
          name: '@midwayjs/faas-cli',
          info: 'FaaS 本地研发工具包'
        },
        {
          name: '@midwayjs/faas',
          info: '函数IoC框架'
        },
        {
          name: '@midwayjs/runtime-engine',
          info: '函数运行时引擎'
        }
      ]
    }
  }

  @Func('api.detail')
  async detail() {
    return {
      message: 'Midway FaaS 是用于构建 Node.js 云函数的 Serverless 框架。帮助您在云原生时代大幅降低维护成本，更专注于产品研发。',
    }
  }

}

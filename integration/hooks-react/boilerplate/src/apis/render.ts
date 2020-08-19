import { Provide, Func } from '@midwayjs/decorator';

@Provide()
@Func('render.handler', { event: 'HTTP', path: '/*', middleware: ['fmw:staticFile'] })
export class Render {
  async handler() {
    return 'Building... Please refresh this page later.';
  }
}

import { Provide, ScopeEnum, Scope } from '@midwayjs/decorator';
@Provide('rewrite')
@Scope(ScopeEnum.Singleton)
export class Rewrite {
  resolve() {
    return function (ctx, next) {
      let orig = ctx.path
      const last = orig.split('/').pop();
      if (last.indexOf('.') === -1) {
        orig += '/';
      }
      if (/\/$/.test(orig)) {
        ctx.originEvent.path = orig + 'index.html';
        Object.defineProperty(ctx.request, 'path', {
          get() {
            return orig + 'index.html';
          }
        });
        return next().then(() => {
          ctx.originEvent.path = orig
        })
      }
      return next()
    };
  }
}
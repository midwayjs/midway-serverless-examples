import { Func, Inject, Provide } from '@midwayjs/decorator';
import { FaaSContext, FunctionHandler, FC } from '@midwayjs/faas';

@Provide()
@Func('index.handler')
export class IndexService implements FunctionHandler {

  @Inject()
  ctx: FaaSContext;  // context

  async handler(event: FC.APIGatewayEvent) {
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
      body: 'hello world',
    } as FC.APIGatewayResponse;
  }
}
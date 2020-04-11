import { invoke } from '@midwayjs/serverless-invoke';
import * as assert from 'assert';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('invoke', async () => {
    const result: any = await invoke({
      functionName: 'apiGatewayTrigger',
      functionDir: join(__dirname, '../'),
      data: [ 
        {
          path: '/tesbbbt',
          queries: {
            a: 1
          },
          body: {
            name: 'test'
          }
        }
      ],
    });
    assert(/hello world/.test(JSON.stringify(result)));
  });
});

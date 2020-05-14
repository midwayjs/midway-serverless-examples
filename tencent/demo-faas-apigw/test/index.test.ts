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
          headers: {
            'Content-Type': 'text/json'
          },
          method: 'POST',
          query: {
            q: 'testq'
          },
          pathParameters: {
            id: 'id'
          },
          path: '/test',
          body: {
            name: 'test'
          }
        }
      ],
    });

    assert(result.isBase64Encoded === false);
    assert(result.statusCode === 200);
    assert(result.headers);
    assert.equal(typeof result.body, 'string');
    const body = JSON.parse(result.body);
    assert.equal(body.method, 'POST');
    assert.equal(body.path, '/test');
    assert.equal(body.body.name, 'test');
    assert.equal(body.params.id, 'id');
  });
});

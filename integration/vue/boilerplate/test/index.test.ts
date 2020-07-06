import { invoke } from '@midwayjs/serverless-invoke';
import assert from 'assert';

describe('/test/index.test.ts', () => {
  it('should use default event', async () => {
    const result = await invoke({
      functionName: 'index',
      data: [
        {
          name: 'faas',
        },
      ],
    });
    // API Gateway must be get a string text
    assert.deepEqual(result.body, '{"message":"Hello Midway FaaS!"}');
  });
});
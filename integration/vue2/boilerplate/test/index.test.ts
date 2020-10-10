import { invoke } from '@midwayjs/serverless-invoke';
import { HTTPTrigger } from '@midwayjs/serverless-fc-trigger';
import assert from 'assert';
describe('/test/index.test.ts', () => {
  it('should use default event', async () => {
    const result = await invoke({
      functionName: 'index',
      data: [
        new HTTPTrigger({
          path: '/help',
          method: 'GET',
        })
      ],
    });
    // API Gateway must be get a string text
    assert(result.body === '{"message":"Hello Midway!"}');
  });
});
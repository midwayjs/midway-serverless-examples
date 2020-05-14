import { invoke } from '@midwayjs/serverless-invoke';
import * as assert from 'assert';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('invoke', async () => {
    const result: any = await invoke({
      functionName: 'emptyTrigger',
      functionDir: join(__dirname, '../'),
      data: [ {
        name: 'faas'
      }],
    });
    assert(/hello world faas/.test(result));
  });
});

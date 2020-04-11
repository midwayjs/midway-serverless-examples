import { invoke } from '@midwayjs/invoke';
import * as assert from 'assert';
import { join } from 'path';
const servicePath = join(__dirname, '../');

describe('/test/invokeAliyun/test/invoke.test.ts', () => {
  it('invoke', async () => {
    const result: any = await invoke({
      functionName: 'index',
      functionDir: servicePath
    });
    assert(/hello world/.test(result.body));
  });
});

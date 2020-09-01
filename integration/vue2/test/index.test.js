'use strict';

const {LightGenerator} = require('light-generator');
const path = require('path');
const fse = require('fs-extra');
const assert = require('assert');
const cp = require('child_process');

describe('/test/index.test.js', () => {

  const targetPath = path.join(__dirname, 'tmp');

  before(async () => {
    if(fse.existsSync(targetPath)) {
      await fse.remove(targetPath);
    }
  });

  after(async () => {
    if(fse.existsSync(targetPath)) {
      await fse.remove(targetPath);
    }
  });

  it('should generate boilerplate', async () => {
    const generator = new LightGenerator().defineLocalPath({
      templatePath: path.join(__dirname, '../'),
      targetPath,
    });

    await generator.run();

    assert(fse.existsSync(path.join(targetPath, 'f.yml')));
    assert(fse.existsSync(path.join(targetPath, 'src')));
    assert(fse.existsSync(path.join(targetPath, 'test')));
    assert(fse.existsSync(path.join(targetPath, 'tsconfig.json')));
    assert(fse.existsSync(path.join(targetPath, 'package.json')));
    let contents = fse.readFileSync(path.join(targetPath, 'f.yml'), 'utf-8');
    assert(/serverless-hello-world/.test(contents));
  });

  it('test generate path', () => {
    cp.execSync('npm install', {
      cwd: targetPath,
    });

    cp.execSync('npm run test', {
      cwd: targetPath,
    });
  });

});

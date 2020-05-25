process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const path = require('path');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const webpackconfig = require('react-scripts/config/webpack.config.js');
const config = webpackconfig('development');
config.entry.shift();
config.output.path = path.resolve(__dirname, '../build');
webpack(config).watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    }
    console.error(stats.toString({
        chunks: false,
        colors: true
    }));
});

const hostName = process.env.HOSTNAME;
if (hostName) {
    console.log('');
    console.log(`Please open http://${hostName.split('-').slice(0,-2).join('-')}-3000.xide.aliyun.com/index.html`);
    console.log('');
    console.log('');
}

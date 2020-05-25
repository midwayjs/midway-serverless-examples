const hostName = process.env.HOSTNAME;
if (hostName) {
    console.log('');
    console.log(`Please open http://${hostName.split('-').slice(0,-2).join('-')}-3000.xide.aliyun.com/index.html`);
    console.log('');
    console.log('');
}

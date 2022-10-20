const {config} = require("./wdio.conf");
require("path");
const chromeConfig = {
    ...config,
    services: [['selenium-standalone', {chrome: 'latest'}]],
    // services: [['chromedriver']],
    capabilities: [{
        maxInstances: 1,
        browserName: "chrome",
        'goog:chromeOptions': {
            args: ['--headless','--start-maximized', '--no-sandbox', '--disable-gpu', '--window-size=1920,1080', '--allow-insecure-localhost']
        },
    }],

    path: "/wd/hub",

};

exports.config = chromeConfig;
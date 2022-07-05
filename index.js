'use strict';

//imports
const { parseProcessName } = require('./helpers/formatters');
const { sendSlackMsg } = require('./helpers/slack.service');

//Dependencies
const pm2 = require('pm2');
const pmx = require('pmx');

const pm2Config = pmx.initModule();//Get pm2 configuration set

const currentModName = 'pm2-logs-notify';

pm2.launchBus((err, bus) => {
    //listen for process errors
    if (pm2Config.error) {
        bus.on('log:err', (data) => {
            if (data && data.process && data.process.name === currentModName) { return; }//Ignore current module errors

            if (data && data.data && data.data.toLowerCase().includes('warning')) { return; }
            const slackUrl = pm2Config['slack_url'];
            if (!slackUrl) { return; }
            const processName = parseProcessName(data.process);
            const payload = {
                title: processName,
                text: data.data
            }
            sendSlackMsg(slackUrl, payload);
        });
    }

    //listen for pm2 kill
    if (pm2Config.kill) {
        bus.on('pm2:kill', (data) => {
            if (data && data.process && data.process.name === currentModName) { return; }//Ignore current module errors

            const slackUrl = pm2Config['slack_url'];
            if (!slackUrl) { return; }
            const payload = {
                title: 'PM2 Kill',
                text: data.msg
            }
            sendSlackMsg(slackUrl, payload);
        });
    }

    if (pm2Config.exception) {
        bus.on('process:exception', function (data) {
            if (data && data.process && data.process.name === currentModName) { return; } // Ignore messages of own module.

            const slackUrl = pm2Config['slack_url'];
            if (!slackUrl) { return; }
            // If it is instance of Error, use it. If type is unknown, stringify it.
            const description = (data.data && data.data.message) ? (data.data.code || '') + data.data.message : JSON.stringify(data.data);
            const payload = {
                title: 'Process Exception',
                text: description
            }
            sendSlackMsg(slackUrl, payload);
        });
    }
});
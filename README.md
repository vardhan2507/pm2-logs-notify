## Install

To install pm2-logs-notify, run the following commands:

```
pm2 install pm2-logs-notify
pm2 set pm2-logs-notify:slack_url slack_incoming_webhook_url
```

## Events Config

- `error` (boolean) - All error logs except warnings. Default: true
- `kill` (boolean) - Fired when PM2 is killed. Default: true
- `exception` (boolean) - Exceptions in the process. Default: true
- `slack_url` (string) - Slack Incoming Webhook URL. Default: null

You can set them on/off by setting them to true or false using the pm2 set command

```
pm2 set pm2-logs-notify:error false
pm2 set pm2-logs-notify:slack_url https://slack_incoming_webhook_url
```

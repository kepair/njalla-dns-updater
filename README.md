Javascript job to keep the records of a domain pointing to the public ip of the server.
With this you don't need to register in DynDNS or NoIP if your ISP changes your IP now and then.

1. Clone this
2. Create a cron job that runs this every X minutes:
```
crontab -e
```
and adding (for every 30 minutes)
```
0 * * * * * /home/iregvd/workspace/njalla-dns-updater/cronjob.sh
```

---
title: Njalla DNS Updater
date: 2020-03-01T12:00:00.000Z
---

JS script to keep the records of a domain pointing to the public ip of the server.
With this you don't need to register in DynDNS or NoIP if your ISP changes your IP now and then.

<!-- more -->

## About

I recently changed the domain of my home server and decided to go to [Njalla](https://nja.la) for it. I liked Njalla because it goes straight to the point. It's private, they have fair prices and it's simple to use.
As most people, I don't have a static IP, so I need to update the address in my DNS records configuration everytime it changes (this happens everytime the router turns off and on and also from time to time randomly).

To solve this, there are two main options:

* Using services like [NoIP](https://www.noip.com/) or [DynDNS](https://dyn.com/)
* Update the DNS records manually or programatically

Why would I want to register yet in another website and subscribe to a yet another "free" service to root all my traffic through someone in order to not worry about my IP when I can simply create a script that does it automatically?
Previously I had the domain with GoDaddy and I had a script running every 30 min with Cron to do the job, but now I couldn't find anything for Njalla already done.

Fortunately, I found [@romualdr](https://github.com/romualdr). He made a JS library to manipulate your domains. With this, it was easy to create a small script that works, and with crontab, I don't have to worry about this anymore.

## How to use (Ubuntu)

1. Clone this
2. Create a cron job that runs this every X minutes by running:
```
crontab -e
```
and adding the following line pointing to "cronjob.sh" (to run it once every hour):
```
0 * * * * * /home/iregvd/workspace/njalla-dns-updater/cronjob.sh
```

## References

[romualdr/node-njalla-dns](https://github.com/romualdr/node-njalla-dns)

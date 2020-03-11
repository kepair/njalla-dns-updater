---
title: Njalla DNS Updater
date: 2020-03-01T12:00:00.000Z
---

JS script to keep the records of a domain pointing to the public ip of the server.
With this you don't need to register in DynDNS or NoIP if your ISP changes your IP now and then.

<!-- more -->

## About

I recently changed the domain of my home server and decided to go to [Njalla](https://nja.la) for it.
As most people, I don't have a static IP, so I need to update the address in my DNS records configuration everytime it changes (this happens everytime the router turns off and on and also from time to time randomly).

To solve this, there are two main options:

* Using services like [NoIP](https://www.noip.com/) or [DynDNS](https://dyn.com/). They send a ping with the current IP after you configured it in the router or installed a client app. You have to deal with the middle domain in your domain service etc.
* Update the DNS records by accessing the domain manager and changing them if necessary through a job that executes in a schedule.

Why register yet in another website when I can simply create a script that does it?
Previously I had the domain with GoDaddy and I had something like [this](https://github.com/SeanDuttonJones/godaddy-ddns-python), but I couldn't find any for Njalla already done.

Luckily, I found [@romualdr](https://github.com/romualdr). He made a JS library to manipulate your domains. With this, it was easy to create a small [js script](https://github.com/kepair/njalla-dns-updater) that does the job, and with crontab, I don't have to worry about this anymore. 

## How to use (Ubuntu)

Requisites:
* Node must be installed (check with `node -v`)

1. Clone this repository in a place accesible for your regular user:
```
git clone https://github.com/kepair/njalla-dns-updater.git
```
2. Replace `<path-to>` in the files `cronjob.sh` and `main.js` to point to the location of the folder:

cronjob.sh:
```
#bin/bash
node <path-to>/njalla-dns-updater/main.js
```
main.js:
```
var credentials = fs.readFileSync('<path-to>/njalla-dns-updater/credentials.txt').toString().split("\n");
```

3. Install dependencies by being in the root folder of the project and typing:
```
npm install
```

4. Create a cron job that runs this every X minutes by running:
```
crontab -e
```
and adding the following line pointing to "cronjob.sh" (to run it once every hour):
```
0 * * * * * <path-to>/njalla-dns-updater/cronjob.sh
```

## References

[romualdr/node-njalla-dns](https://github.com/romualdr/node-njalla-dns)

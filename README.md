## About

I recently changed the domain of my home server and decided to go to [Njalla](https://nja.la) for it. I liked Njalla because it goes straight to the point. It's private, they have fair prices and it's simple to use.
As most people, I don't have a static IP, so I need to update the address in my DNS records configuration everytime it changes (this happens everytime the router turns off and on and also from time to time randomly).

To solve this, there are two main options:

* Using services like [NoIP](https://www.noip.com/) or [DynDNS](https://dyn.com/)
* Update the DNS records manually or programatically

Why would I want to register yet in another website and subscribe to a yet another "free" service to root all my traffic through someone in order to not worry about my IP when I can simply create a script that does it automatically?
Previously I had the domain with GoDaddy and I had a script running every 30 min with Cron to do the job, but now I couldn't find anything for Njalla already done.

Fortunately, I found [@romualdr](https://github.com/romualdr). He made a JS library to manipulate your domains. With this, it was easy to create a small [js script](https://github.com/kepair/njalla-dns-updater) that does the job, and with crontab, I don't have to worry about this anymore. 

## How to use (Ubuntu)

Requisites:
* Node must be installed (check with `node -v`)

1. Clone this repository in a place accesible for your regular user:
```
git clone https://github.com/kepair/njalla-dns-updater.git
```
2. Edit the file `cronjob.sh` to point to the location of `main.js`:
```
#bin/bash
node <path-to>/njalla-dns-updater/main.js
```
3. Create a cron job that runs this every X minutes by running:
```
crontab -e
```
and adding the following line pointing to "cronjob.sh" (to run it once every hour):
```
0 * * * * * <path-to>/njalla-dns-updater/cronjob.sh
```

## References

[romualdr/node-njalla-dns](https://github.com/romualdr/node-njalla-dns)

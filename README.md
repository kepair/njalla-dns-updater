# Njalla DNS record updater

Javascript job that checks the current public IP of where is running and updates the DNS records of a domain registered in [Njalla](https://njal.la/). The job is scheduled in crontab.

This makes unnecessary to use services like DynDNS or No-IP. Set it up once and forget about it.

### Requirements:

* Node must be installed (check with `node -v`)

### Steps

1. Clone this repo:
```
git clone https://github.com/kepair/njalla-dns-updater.git
```
2. Install dependencies:
```
cd njalla-dns-updater/
npm install
```
3. Change the name of `credentials.txt.example` to `credentials.txt` file and write your user and password there. At his point you can test the script by running:
```
node ./main.js $PWD
```
_$PWD returns the current directory_

4. Make sure `cronjob.sh` executable by your user:
```
sudo chmod u+x cronjob.sh
```
5. Create a cron job that runs this every X minutes:
```
crontab -e
```
To add a job that runs every hour:
```
0 * * * * * <path-to>/njalla-dns-updater/cronjob.sh
```

This script updates all records from all domains because it was what I needed at the moment. If you want you update all records from only certain domains, comment line 17 (`const domains = await getDomains();`) and uncomment line 5 (`//const domains = ["domain1.com","domain2.net"]`) and update your domains accordingly.

### References

[romualdr/node-njalla-dns](https://github.com/romualdr/node-njalla-dns)
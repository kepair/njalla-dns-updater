const publicIp = require('public-ip');
const { login, getDomains, getRecords, update } = require('njalla-dns')
const currentPath = process.argv[2];
//const domains = ["domain1.com","domain2.net"]

;
(async function main() {
    //Read user and pass from credentials.txt
    var fs = require('fs');
    var credentials = fs.readFileSync(currentPath + '/credentials.txt').toString().split("\n");
    //Getting server public IP
    var pubIp = await publicIp.v4()
    //Log in to Nja.la
    await login(credentials[0], credentials[1])
    //Get all domains for that account
    const domains = await getDomains()
    //Update IP's of all records from all domains
    domains.forEach(async domain => {
        const records = await getRecords(domain);
        const aRecords = records.filter(record => record.type == 'A');
        aRecords.forEach(async record => {
            //If IP is not the same, update records
            if (pubIp != record.content) {
                await update(domain, record, { content: pubIp })
                console.log(record.name + "." + domain + " new ip: " + pubIp)
            } else {
                console.log(record.name + "." + domain + " ip is up to date")
            }
        });
    });
})()


const https = require('https');
const publicIp = require('public-ip');
const { login, getDomains, getRecords, update } = require('njalla-dns')

;(async function main() {
    //Read user and pass from credentials.txt
    var fs = require('fs');
    var credentials = fs.readFileSync('<path-to>/njalla-dns-updater/credentials.txt').toString().split("\n");
    //Getting server public IP
    var pubIp = await publicIp.v4()
    //Log in to Nja.la
    await login(credentials[0], credentials[1])
    //Get domains for that account
    const domains = await getDomains()
    //Update IP's of all records from all domains
    for(i=0;i<domains.length;i++){
      const records = await getRecords(domains[i])
      for(j=0;j<records.length;j++){
        //If IP is the same, don't update records
        if(pubIp!=records[j].content){
          await update(domains[i], records[j], { content: 'publicIp' })
          console.log(records[j].name+"."+domains[i]+" new ip: "+pubIp)
        }else{
          console.log(records[j].name+"."+domains[i]+" ip is up to date")
        }
      }
    }
})()

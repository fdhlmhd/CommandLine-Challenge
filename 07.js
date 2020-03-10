'use strict'
const cli = require('caporal')
const getIP = require('external-ip')();

cli
  .version("1.0.0")
  .description("CLI Challenge")
  .command("ip-external")
  .action(() => {

    getIP((err, ip) => {

        if (err){
            throw err
        }
        console.log(ip)
    })


  })

cli.parse(process.argv);
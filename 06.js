const cli = require ('caporal')
const os = require('os')


cli 
    .version('1.0.0')
    .description('CLI Challenge')
    .command('ip')
    .argument('<text>')
    .action((args, options, logger) => {
        logger.info(os.networkInterfaces().wlp3s0[0].address)
    })

cli.parse(process.argv);
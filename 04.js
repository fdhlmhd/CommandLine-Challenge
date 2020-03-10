const cli = require('caporal')

cli 
    .version('1.0.0')
    .description('CLI Challenge')
    .command('obfuscate')
    .argument('<text>')
    .action((args, options, logger) => {
        
        const result = [];
        for (let i = 0; i < args.text.length; i++){
            result.push(`&#${args.text.charCodeAt(i)};`)
        }  

        logger.info(result.join(''))
    })
       

    cli.parse(process.argv)

    
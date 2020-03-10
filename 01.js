const cli = require('caporal')

cli 
    .version('1.0.0')
    .description('CLI Challenge')
    .command('lowercase')
    .argument('<text>', 'input text', cli.STRING)
    .action((args, options, logger) => {
        logger.info(args.text.toLowerCase())

    })

    .command('uppercase')
    .argument('<text>', 'input text', cli.STRING)
    .action((args, options, logger) => {
        logger.info(args.text.toUpperCase())

    })

    .command('capitalize')
    .argument('<text>', 'input text', cli.STRING)
    .action((args, options, logger) => {
        logger.info(args.text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '))

    })

cli.parse(process.argv)
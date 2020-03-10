const cli = require('caporal')

cli 
    .version('1.0.0')
    .description('CLI Challenge')
    .command('add')
    .argument('<num...>')
    .action((args, options, logger) => {
        
        const nums = args.num.map(el => parseFloat(el))
        logger.info(nums.reduce((a,b) => a + b))
    })


    .command('subtract')
    .argument('<num...>')
    .action((args, options, logger) => {
        
        const nums = args.num.map(el => parseFloat(el))
        logger.info(nums.reduce((a,b) => a - b))
    })

    .command('multiply')
    .argument('<num...>')
    .action((args, options, logger) => {
        
        const nums = args.num.map(el => parseFloat(el))
        logger.info(nums.reduce((a,b) => a * b))
    })

    .command('divide')
    .argument('<num...>')
    .action((args, options, logger) => {
        
        const nums = args.num.map(el => parseFloat(el))
        logger.info(nums.reduce((a,b) => a / b))
    })



    cli.parse(process.argv)
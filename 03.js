const cli = require('caporal')

cli 
    .version('1.0.0')
    .description('CLI Challenge')
    .command('palindrome')
    .argument('<text>')
    .action((args, options, logger) => {
        
        const removeChar = args.text.replace(/[^A-Z0-9]/ig, '').toLowerCase();
        const checkPalindrome = removeChar.split('').reverse().join('');

        if (removeChar == checkPalindrome) {
            logger.info(`String : '${args.text}'`);
            logger.info(`Is palindrome? Yes`)
        } else {
            logger.info(`String : '${args.text}'`);
            logger.info(`Is palindrome? No`)
        }
        
    })


    cli.parse(process.argv)
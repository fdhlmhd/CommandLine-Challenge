const fs = require("fs");
const cli = require("caporal");
const screenshot = require("node-server-screenshot");

const formating = (toFormat, fromWeb) => {
  let url = fromWeb;
  let format = "";

  for (let i = 1; i <= Infinity; i++) {
    format = `screenshoot-${i}.${toFormat}`;

    try {
      if (fs.existsSync(format)) {
        format = `screenshoot-${i + 1}.${toFormat}`;
      } else {
        break;
      }
    } catch (err) {
      console.log(err);
    }
  }

  screenshot.fromURL(url, format, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Image telah di simpan');
    
  });
};

cli
    .command('screenshot')
    .argument('<web>')
    .option('--format <amount>')
    .option('--output <mount>')
    .action((args, options) => {
        if(options.output !== undefined){
            formating(options.output, args.web)
        }
        else {
            formating(options.format,args.web)
        }
    })

cli.parse(process.argv)
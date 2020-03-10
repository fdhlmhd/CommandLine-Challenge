const cli = require("caporal");
const req = require("request");
const cherio = require("cheerio");

cli
  .version("1.0.0")
  .description("CLI Challenge")
  .command("headlines")
  .action(() => {
    let url = "https://www.kompas.com/";

    req(url, (err, res, html) => {
      if (!err) {
        let ambil = cherio.load(html);
        for (let i = 0; i < ambil(".headline__big__link").length; i++) {
          console.log(
            "Title :" + ambil(".headline__big__title")[i].children[0].data
          );
          console.log("Url :" + ambil(".headline__big__link")[i].attribs.href);
        console.log('\n');
            
        }
      }
    });
  });

cli.parse(process.argv);

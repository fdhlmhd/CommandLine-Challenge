const cli = require("caporal");
const req = require("request");
const cherio = require("cheerio");

cli
  .version("1.0.0")
  .description("CLI Challenge")
  .command("movies")
  .action(() => {
    let url = 'https://www.cgv.id/en/'

    req(url,(err, res, html) =>{
        let urlFilm = [];
        if(!err) {
            let ambil = cherio.load(html);
            for (let i=0; i< ambil('.slides').children().length; i++) {
                urlFilm.push(ambil('.slides').children()[i].children[0].next.attribs.href)
            }
        }

        for (let x of urlFilm){
            req(x,(err, res, html) => {
                if(!err){
                    let ambil = cherio.load(html)
                    console.log(`Title : ${ambil('.movie-info-title')[0].children[0].data.trim()}`);
                    console.log(`Sinopsis : ${ambil('.movie-synopsis')[0].children[0].data.trim()}`);

                    for (let y=0; y<ambil('.movie-add-info').children().find('li').length;y++){
                        console.log(ambil('.movie-add-info').children().find('li')[y].children[0].data);
                        
                    }

                    console.log('\n');
                    
                    
                }
            })
        }
    })
  })


  cli.parse(process.argv);
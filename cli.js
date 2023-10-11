const path = require('path');
const mdLinks = require('./index.js');
const process = require('process'); 
const args = process.argv.slice(2);

const options = {
    validate: args.includes('--validate'),
    stats: args.includes('--stats')
};

mdLinks(path, options.validate).then((links) => {
    if (options.stats) {
        const allLinks = links.length;
        const hrefs = links.map(link => link.href);
        const uniqueLinks = hrefs;

        if(options.validate){
            const workingLinks = links.filter(link => link.stats >= 200).length;
            const failLinks = links.filter(link => link.status >= 400).length;
        }
    } else {
        return links;
    }
}).catch((err) => {
    console.err(err);
})
/*mdLinks('./Directorio', true) //true para validar enlaces
.then ((links)=>{
 console.log(links);
})
.catch((reject)=>{
    console.log(reject);
})

/*mdLinks('ejemplo.md', false) //false para no validar enlaces, solo obtenerlos
.then ((links)=>{
 console.log(links);
})
.catch((reject)=>{
    console.log(reject);
})*/
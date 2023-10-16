#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process'); 
const args = process.argv.slice(2);
const options = {
    validate: args.includes('--validate'),
    stats: args.includes('--stats')
};

mdLinks(args[0], options.validate).then((links) => {
    if (options.stats) {
        const allLinks = links.length;
        const uniqueLinks = [];
        links.forEach(link => {
            if(!uniqueLinks.includes(link.href)){
                uniqueLinks.push(link.href);
            }
        });
        
        console.log('Total: '+ allLinks);
        console.log('Unicos: '+ uniqueLinks.length);
        if(options.validate){
            const workingLinks = links.filter(link => link.valid === 'ok').length;
            const failLinks = links.filter(link => link.valid === 'fail').length;
            console.log('Rotos: '+failLinks);
            console.log('Validos: '+workingLinks);
        }
    } else {
        console.log(links);
    }
}).catch((err) => {
    console.log(err);
});
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
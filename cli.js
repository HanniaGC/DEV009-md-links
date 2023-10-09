const mdLinks = require('./index.js');


mdLinks('./Directorio', true) //true para validar enlaces
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
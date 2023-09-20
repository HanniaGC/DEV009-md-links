const mdLinks = require('./index.js');

mdLinks('./ejemplo.md')
.then ((resolve)=>{
 console.log(resolve);
})
.catch((reject)=>{
    console.log(reject);
})
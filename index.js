const mdLinks = require("md-links");
const fs = require('fs');

const mdLinks = (path, options) => {
    return new Promise((resolve, reject) => {
        //la ruta existe
        if (fs.existsSync(route)) {// si es es absoluta
            resolve
            //¿La ruta es absoluta?
        } else {
            //No existe se rechaza la promesa.
            reject('la ruta no existe');
        }

    })
}


module.exports = () => {
    mdLinks
};

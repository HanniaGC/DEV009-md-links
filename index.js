const functions = require('./data.js');

const mdLinks = (path, validate) => {
    return new Promise((resolve, reject) => {
        //Existe la ruta?
        if (functions.isAbsolutePath(path)) {
            if (functions.pathExist(path)) {
                if (!functions.isMarkdownFile(path)) {
                    reject("El archivo no es un archivo Markdown.");
                    return;
                }
                
                functions.readMarkdownFile(path)
                    .then(content => {
                        const links = functions.findLinksInMarkdown(content);
                        if (links.length > 0) {
                            resolve(links); //Termina la promesa resuelta con los enlaces encontrados
                        } else {
                            reject("No se encontraron enlaces en el archivo.");
                        }
                    })
                    .catch(error => {
                        reject(`Error al leer el archivo: ${error}`);
                    });
            } else {
                console.log("La ruta no existe");
            }
        } else {
            reject("La ruta no es absoluta");
        }
    })
}

module.exports = mdLinks;
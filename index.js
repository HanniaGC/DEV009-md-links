const functions = require("./data.js");

const mdLinks = (inputPath, validate = false) => {
  return new Promise((resolve, reject) => {
    inputPath = functions.isAbsolutePath(inputPath)
      if (functions.pathExist(inputPath)) {
        functions
          .extractLinksFromDirectory(inputPath)
          .then((links) => {
            if (validate) {
              functions.validateLink(links).then((result) => resolve(result)); 
            } else {
              resolve(links);
            }
          })
          .catch(() => {
            if (!functions.isMarkdownFile(inputPath)) {//si no es
              reject("El archivo no es un archivo Markdown."); // Hacerle test***
            } else { //pero si es
              functions
                .readMarkdownFile(inputPath)
                .then((content) => {
                  const links = functions.findLinksInMarkdown(content, inputPath);
                  if (links.length === 0){
                    reject('No se encontraron links en el archivo');
                    return
                  }
                  if (validate) {
                    functions.validateLink(links).then(result => resolve(result));
                  } else {
                    resolve(links);
                    // Resuelve la promesa con los enlaces encontrados
                  }
                })
            }
          });
      } else {
        reject("La ruta no existe");
      }
  });
};

module.exports = mdLinks;
//testear primero si es archivo, (respuesta resolve) despue si es directorio, los reject
//un nuevo archivo para test de funciones de data.js aqui se mocck a axios solo cuando se hace la peticion 
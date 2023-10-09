const functions = require("./data.js");

/*
const mdLinks = (path, validate = false) => {
  return new Promise((resolve, reject) => {
   //la ruta es absoluta?
    if (functions.isAbsolutePath(path)) { //debe ejecutarse no
       //Existe la ruta?
      if (functions.pathExist(path)) {
        //la ruta es markdown?
        if (!functions.isMarkdownFile(path)) {//si no es
          reject("El archivo no es un archivo Markdown."); // Hacerle test***
        } else { //pero si es
          functions
            .readMarkdownFile(path)
            .then((content) => {
              const links = functions.findLinksInMarkdown(content, path);
              if (validate) {
                functions.validateLink(links).then(result => resolve(result))
              } else {
                resolve(links);
                // Resuelve la promesa con los enlaces encontrados
              }
            })
            .catch((error) => {
              reject(`Error al leer el archivo 1: ${error}`);
            });
        }
      } else {
        reject("La ruta no existe");
      }
    }
  });
};*/
const mdLinks = (directory, validate = false) => {
  return new Promise((resolve, reject) => {
    if (functions.isAbsolutePath(directory)) {
      if (functions.pathExist(directory)) {
        functions
          .extractLinksFromDirectory(directory)
          .then((links) => {
            if (validate) {
              functions.validateLink(links).then((result) => resolve(result));
            } else {
              resolve(links);
            }
          })
          .catch((error) => {
            reject(`Error al extraer los enlaces: ${error}`);
          });
      } else {
        reject("El directorio no existe");
      }
    } else {
      reject("La ruta debe ser absoluta");
    }
  });
};

module.exports = mdLinks;

module.exports = mdLinks;

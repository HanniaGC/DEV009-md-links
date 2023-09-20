const fs = require('fs');
const path = require('node:path');

//buscar los enlases con la Regexp
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

//funcion para identificar si existe la ruta
function pathExist(filePath) {
  return fs.existsSync(filePath);
}

//una funcion que me la transforme de relativa en absoluta
function isAbsolutePath(filePath) {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(filePath)
  }
  return filePath;
}

//verifica si el archivo es markdown 
function isMarkdownFile(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  return ['.md', '.markdown', '.mdown'].includes(extname);
}

//Funcion para leer el archivo y buscar rutas
//utf8 sirve para codificar caracteres y se interpretan para poder leerlos
function readMarkdownFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (!err) {
       resolve(data);
      } else {
        reject('Error: ${err}')
      }
    });
  });
}

//guarda los links en un arreglo para armar los objetos
function findLinksInMarkdown(content) {
  const links = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[0]; // Texto del enlace
    const href = match[1]; // URL del enlace
    const file = match[2]; // Ruta del archivo donde se encontro
    links.push({ text, href, file });
  }
  return links;
}

// verificar si se encuentran links y mostrarls
function printLinks(links) {
  if (links.length > 0) {
    console.log('Enlaces encontrados:');
    links.forEach((link, index) => {
      console.log(`[${index + 1}] Texto: ${link.text}, URL: ${link.href}`);
    });
  } else {
    console.log('No se encontraron enlaces en el archivo.');
  }
}

//exportando en manera de objeto las funciones 
module.exports = {
  pathExist,
  isMarkdownFile,
  readMarkdownFile,
  isAbsolutePath,
  findLinksInMarkdown,
  printLinks
};
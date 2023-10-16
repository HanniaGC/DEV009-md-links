const fs = require("fs");
const path = require("node:path");
const axios = require("axios");


//buscar los enlases con la Regexp
const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

//funcion para identificar si existe la ruta
function pathExist(filePath) {
  return fs.existsSync(filePath);
}

//una funcion que me la transforme de relativa en absoluta
function isAbsolutePath(filePath) {
  if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(filePath);
  }
  return filePath;
}

//verifica si el archivo es markdown
function isMarkdownFile(filePath) {
  const extname = path.extname(filePath).toLowerCase();
  return [".md", ".markdown", ".mdown"].includes(extname);
}

//Funcion para leer el archivo y buscar rutas
//utf8 sirve para codificar caracteres y se interpretan para poder leerlos
function readMarkdownFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject("Error: ${err}");
      }
    });
  });
}

//guarda los links en un arreglo para armar los objetos
function findLinksInMarkdown(content, filePath) {
  const links = [];

  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1]; // Texto del enlace
    const href = match[2]; // URL del enlace
    links.push({ text, href, file: filePath });
  }
  return links;
}

//Hito 3
const directoryPath = './Directorio';

function getAllMarkdownFilesInDirectory(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, fileNames) => {
      if (err) {
        reject('Esto es un archivo');
      } else {
        console.log('Esto es un dirtectorio')
        const markdownFiles = fileNames.filter((fileName) => {
          const filePath = path.join(directoryPath, fileName);
          return isMarkdownFile(filePath);
        });
        resolve(markdownFiles.map((fileName) => path.join(directoryPath, fileName)));
      }
    });
  });
}

function extractLinksFromDirectory(directoryPath) {
  return getAllMarkdownFilesInDirectory(directoryPath)
    .then((filePaths) => {
      const promises = filePaths.map(async (filePath) => {
        const content = await readMarkdownFile(filePath);
        return findLinksInMarkdown(content, filePath);
      });

      return Promise.all(promises)
      .then((results) => [].concat(...results))
      .catch((error) => {
        console.error(error);
        throw error;
      });
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });
};
//HITO 2
//Funcion para validar con fetch un enlace
const validateLink = (links) => {
  const linkvalid = links.map((link) => {
    return axios
      .get(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return {
            text: link.text,
            href: link.href,
            file: link.file,
            status: response.status,
            valid: "ok",
          };
        } else {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            valid: "fail",
          };
        }
      })
      .catch((error) => {
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status: error.status === undefined ? "N/A" : error.status,
          valid: "fail",
        };
      });
  });
  //console.log(linkvalid, 'mensaje')
  return Promise.all(linkvalid);
};

//exportando en manera de objeto las funciones
module.exports = {
  pathExist,
  isMarkdownFile,
  readMarkdownFile,
  isAbsolutePath,
  findLinksInMarkdown,
  validateLink,
  extractLinksFromDirectory
};

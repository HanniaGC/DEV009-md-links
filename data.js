const fs = require('fs');
const path = require('node:path'); 

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

//ruta del archivo
const routeMd = '/docs/01-milestone.md';

//Funcion para leer el archivo y buscar rutas
fs . readFile ( ' /Users/joe/test.txt' ,  ' utf8' ,  ( err , datos )  =>  { 
    if  ( err )  { 
      console . error ( err ) ; 
      return ;
    }
})

//una funcion que me la transforme de relativa en absoluta
const relativePath = 'ruta relativa**';
const absolutePath = path.resolve();
//

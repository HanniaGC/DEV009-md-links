const mdLinks = require('../index.js'); 
const arrayexp = [
  {
    text: 'Enlace 1',
    href: 'https://es.javascript.info/promise-basics',
    file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
  },
  {
    text: 'Enlace 2',
    href: 'https://nodejs.org/api/modules.html#modules-commonjs-modules',
    file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
  },
  {
    href: 'https://www.ejemplo3.com',
    text: 'Enlace 3',
    file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
  }
];
// Inicio de test
describe('mdLinks', () => {
// resolve de un solo archivo
  it('deberia retornar un arreglo con objetos con tres propiedades cada una', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md'; // Ruta a un archivo Markdown con enlaces 

    return mdLinks(path).then((result) => {
      //Result es un arreglo de enlaces
      expect(result).toEqual(arrayexp);
  })
});

it('debería resolver con los enlaces encontrados cuando no se valida', () => {
  const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md'; // Ruta a un archivo Markdown con enlaces
  const validate = false; // No se realiza validación

  return mdLinks(path, validate).then((result) => {
    //Result es un arreglo de enlaces
    expect(result).toEqual(arrayexp);
  });
});

it('debería resolver con los enlaces encontrados y validados', () => {
  const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md'; // Ruta a un archivo Markdown con enlaces
  const validate = true; // Se realiza validación
  const arrayexpValid = [
    {
      text: 'Enlace 1',
      href: 'https://es.javascript.info/promise-basics',
      file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
      status: 200,
      statusText: 'ok'
    },
    {
      text: 'Enlace 2',
      href: 'https://nodejs.org/api/modules.html#modules-commonjs-modules',
      file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
      status: 200,
      statusText: 'ok'
    },
    {
      href: 'https://www.ejemplo3.com',
      text: 'Enlace 3',
      file: "C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md",
      status: 'N/A',
      valid: 'fail'
    }
  ];

  return mdLinks(path, validate).then((result) => {
    // Arreglo de enlaces validados
    expect(result).toEqual(arrayexpValid);
  });
});
// Rejects
  it('Deberia rechazar la promesa si el archivo encontrado no es markdown', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md';

    return mdLinks(path).catch((result) => {
      expect(result).toBe("El archivo no es un archivo Markdown.")
    });
  });

  it('debería rechazar con un mensaje si no se encuentra ningún enlace', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.m'; // Ruta a un archivo Markdown sin enlaces

    return mdLinks(path).catch((error) => {
      expect(error).toBe("La ruta no existe");
    });
  });

  it('Deberia rechazar la promesa si la ruta no existe', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\ejemplo.md';
    return mdLinks(path).catch((result) => {
      expect(result).toBe('La ruta no existe');
    });
  });

//Archivos de un directorio
   it('deberia retornar los objetos con cinco propiedades  de los link esncontrados en los archivos de un directorio', () => {
     const path = 'Directorio';
     const validate = true;
     const arrayexpDirectori = [
      {
        text: 'Enlace 1',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Array',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo1.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 2',
        href: 'https://nodejs.org/api/modules.html#modules-commonjs-modules',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo1.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 3',
        href: 'https://desarrolloweb.com/articulos/lectura-archivos-nodejs.html',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo1.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 1 ejemplo 2',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Array',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo2.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 2 ejemplo 2',
        href: 'https://www.aulaclic.es/articulos/html5-semantica_2.html',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo2.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 3 ejemplo 2',
        href: 'https://jestjs.io/es-ES/docs/getting-started',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo2.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 1 ejemplo 3',
        href: 'https://developer.mozilla.org/es/docs/Glossary/Array',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo3.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 2 ejemplo 3',
        href: 'https://nodejs.org/api/modules.html#modules-commonjs-modules',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo3.md',
        status: 200,
        statusText: 'ok'
      },
      {
        text: 'Enlace 3 ejemplo 3',
        href: 'https://desarrolloweb.com/articulos/lectura-archivos-nodejs.html',
        file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo3.md',
        status: 200,
        statusText: 'ok'
      }
    ];

    return mdLinks(path, validate).then((result) => {
       expect(result).toEqual(arrayexpDirectori);
    });
   });
  


});

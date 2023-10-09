const mdLinks = require('../index.js'); 

describe('mdLinks', () => {
  it('debería resolver con los enlaces encontrados cuando no se valida', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md'; // Ruta a un archivo Markdown con enlaces
    const validate = false; // No se realiza validación

    return mdLinks(path, validate).then((result) => {
      //Result es un arreglo de enlaces
      expect(Array.isArray(result)).toBe(true);
    });
  });
//un test para el contenido de lo que retorna
  it('debería rechazar con un mensaje si no se encuentra ningún enlace', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.m'; // Ruta a un archivo Markdown sin enlaces

    return mdLinks(path).catch((error) => {
      expect(error).toBe("La ruta no existe");
      //testear los otros 
    });
  });

  it('debería resolver con los enlaces encontrados y validados', () => {
    const path = 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\ejemplo.md'; // Ruta a un archivo Markdown con enlaces
    const validate = true; // Se realiza validación

    return mdLinks(path, validate).then((result) => {
      // Arreglo de enlaces validados
      expect(Array.isArray(result)).toBe(true);
    });
  });

//otro it para saber que es lo  que retorna
});

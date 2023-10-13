const funcion = require('../data.js');
const validateLink = funcion.validateLink;
const axios = require("axios");

jest.mock('axios')

describe('validateLink', () => {
    it('Deberia resolver si el link es valido y retornar un objeto con cinco propiedades',async () => {
      const links = [{ text:'Enlace 1 ejemplo 2', href:'https://developer.mozilla.org/es/docs/Glossary/Array', file:'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo2.md'}];
      
      axios.get.mockResolvedValue({status: 200})
      
      const result = await validateLink(links);
      console.log(result);
      return expect(result).toEqual([
        {
          text: 'Enlace 1 ejemplo 2',
          href: 'https://developer.mozilla.org/es/docs/Glossary/Array',
          file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo2.md',
          status: 200,
          statusText: 'ok'
        }
      ])
    })
    
    it('Deberia resolver si el link NO es valido y retornar un objeto con cinco propiedades', async () => {
      const links = [{ text:'Enlace 3 ejemplo 3', href:'https://desarrolloweb.com/articulos/lectura-archivos-cvzxcbnodejs.html', file:'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo3.md'}];
      
      axios.get.mockRejectedValue({response:{status: 404}})
      
      const result = await validateLink(links);
      console.log(result);
      return expect(result).toEqual([
        {
          href: 'https://desarrolloweb.com/articulos/lectura-archivos-cvzxcbnodejs.html',
          text: 'Enlace 3 ejemplo 3',
          file: 'C:\\Users\\danie\\Documents\\HanniaLaboratoria\\DEV009-md-links\\Directorio\\ejemplo3.md',
          status: 'N/A',
          valid: 'fail'
        }
      ])
    })
    /*it('Deberia reject si el link NO es valido', () => {
      axios.get.mockRejectedValue({response:{status: 404}})

      return expect(validateLink('https://developer.mozilla.org/jdkfhdfag')).rejects.toBe(404)
    })*/
})
const mdLinks = require('../index.js');
const functions = require('../data.js')


describe('mdLinks', () => {
  it('Deberia devolver una promesa', () => {
    const result = mdLinks();
    expect(result instanceof Promise).toBe(true);

  })
});

// Mock de las funciones 
functions.isAbsolutePath = jest.fn().mockReturnValue(true);
functions.pathExist = jest.fn().mockReturnValue(true);
functions.isMarkdownFile = jest.fn().mockReturnValue(true);
functions.readMarkdownFile = jest.fn().mockResolvedValue(`
  [Enlace 1](https://www.ejemplo1.com)
  [Enlace 2](https://www.ejemplo2.com)
  [Enlace 3](https://www.ejemplo3.com)
`);
functions.findLinksInMarkdown = jest.fn().mockReturnValue([
  { text: 'Enlace 1', href: 'https://www.ejemplo1.com' },
  { text: 'Enlace 2', href: 'https://www.ejemplo2.com' },
  { text: 'Enlace 3', href: 'https://www.ejemplo3.com' },
]);

describe('mdLinks', () => {
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('miArchivo.md').then((result) => {
      expect(result).toEqual([
        { text: 'Enlace 1', href: 'https://www.ejemplo1.com' },
        { text: 'Enlace 2', href: 'https://www.ejemplo2.com' },
        { text: 'Enlace 3', href: 'https://www.ejemplo3.com' },
      ]);
    });
  });
});
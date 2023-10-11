const functions = require("../data.js");

describe('isMarkdownFile', () => {
    it('Deberia retornat true si el archivo es markdown', () => {
        const filePath = './ejemplo.md';
        const result = functions.isMarkdownFile(filePath);
        expect(result).toBe(true);
    });
});

it('Debería retornar false para archivos no Markdown', () => {
    const filePath = './ejemplo.doc';
    const result = functions.isMarkdownFile(filePath);
    expect(result).toBe(false);
  });

/*describe('pathExist', () => {
    it("debería retornar true si la ruta existe", () => {
      expect().toBe(true);
    });
  
    import('debería retornar false si la ruta no existe', () => {
      expect(functions.pathExist('./easjemplo.md')).toBe(false);
    });
  });*/
export class Livro {
    id?: number;
    nome: string;
    preco: number;
    paginas: number;
    codigo: number;
    categoria: {
      id: number;
      nome: string;
    }
  }
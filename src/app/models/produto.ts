export class Produto {
    id? : string;
    nome : string;
    preco : number;

    constructor(nome : string, preco : number) {
        this.nome = nome;
        this.preco = preco;
    }

    /*
    public getNome() : string {
        return this._nome;
    }

    public getPreco() : number {
        return this._preco;
    }

    public setNome(nome : string) {
        this._nome = nome;
    }

    public setPreco(preco : number) {
        this._preco = preco;
    }*/
}

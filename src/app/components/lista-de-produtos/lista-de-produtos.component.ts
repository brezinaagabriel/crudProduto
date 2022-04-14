import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoFirebaseService } from 'src/app/services/produto-firebase.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.scss']
})

export class ListaDeProdutosComponent implements OnInit {
  public lista_produtos : Produto[] = [];

  constructor(private _router : Router, 
    private usuarioService : UsuarioService,
    private produtoService : ProdutoFirebaseService) {

    }
    /*private _actRoute : ActivatedRoute) {
      this._actRoute.params.subscribe((parametros)=>{
        if (parametros["nome"] && parametros["preco"]) {
          this.lista_produtos.push(new Produto (
            parametros["nome"],
            parametros["preco"]
          ))
        }
      });
    }*/

  ngOnInit(): void {
    this.produtoService.getProdutos()
    .subscribe(res => {
      this.lista_produtos = res.map(e=>{
        return {
          id : e.payload.doc.id,
          ...e.payload.doc.data() as Produto
        } as Produto;
      })
    })
    /*let produto = new Produto("Camisa", 200);
    this.lista_produtos.push(produto);
    this.lista_produtos.push(new Produto("Camiseta", 50));
    this.lista_produtos.push(new Produto("Calça", 100));*/
  }

  public excluir(produto : Produto) {
    // Usando service com firebase
    let resultado = confirm("Deseja excluir o produto " + produto.nome + "?");
    if(resultado) {
      this.produtoService.deletarProduto(produto)
      .then(() => { alert("Produto excluído com sucesso!")})
      .catch(() => { alert("Erro ao excluir produto!")})
    
    }
    // Sem service
    /*this.lista_produtos.splice(index, 1);
    alert("Produto excluído com sucesso!")*/
  }

  public editar(produto : Produto) : void {
    this._router.navigate(["/editarProduto", produto.id]);
  }

  public irParaCriarProduto() {
    this._router.navigate(["/criarProduto"]);
  }

  public logout() {
    let resultado = confirm("Deseja realmente sair?");
    if (resultado) {
      this.usuarioService.logout()
      .then(() => {
        this._router.navigate(["/login"]);
      })
      .catch(() => {
        alert("Erro ao sair da plataforma!");
      })
    } 
  }

}
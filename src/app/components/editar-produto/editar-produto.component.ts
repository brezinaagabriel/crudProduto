import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { ProdutoFirebaseService } from 'src/app/services/produto-firebase.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss']
})
export class EditarProdutoComponent implements OnInit {
  //public nome : string | undefined;
  //public preco : number | undefined;
  public formEditar : FormGroup;
  private id ? : any;

  constructor(private _router : Router, 
    private _actRoute : ActivatedRoute,
    private _produtoService : ProdutoFirebaseService,
    private _formBuilder : FormBuilder) {
      this.formEditar = this._formBuilder.group({
        nome : ["", [Validators.required, Validators.minLength(5)]],
        preco : ["", [Validators.required]]
      });
     }

  ngOnInit(): void {
    this._actRoute.params.subscribe((parametros) => {
      //console.log(parametros["indice"]);
      if (parametros["indice"]) {
        this.id = parametros["indice"];
        this._produtoService.getProduto(parametros["indice"])
        .subscribe(res => {
          let produtosRef : any = res;
          this.formEditar = this._formBuilder.group({
            nome : [produtosRef.nome, [Validators.required, Validators.minLength(5)]],
            preco : [produtosRef.preco, [Validators.required]]
          });
        })
        //this.nome = produto.getNome();
        //this.preco = produto.getPreco();
        
      }
    });
  }

  private validarFormulario() {
    for (let campos in this.formEditar.controls) {
      this.formEditar.controls[campos].markAllAsTouched();
    }
  }

  public submitForm (){
    this.validarFormulario();
    if (!this.formEditar.valid) {
      return;
    }
    this.salvar();
  }

  public salvar() {
    //console.log(this.nome + " " + this.preco);
    /*if(!this.nome) {
      alert("Nome é obrigatório!");
      return;
    }
    if(!this.preco) {
      alert("Preço é obrigatório!");
      return;
    }*/
    //let produto = new Produto(this.formEditar.controls["nome"].value, this.formEditar.controls["preco"].value);
    this._produtoService.editarProduto(this.formEditar.value, this.id)
    .then(() => {alert("Produto editado com sucesso!")
      this._router.navigate(["/listaDeProdutos"])
    })
    .catch((error) => {console.log(error)
      alert("Erro ao salvar produto!")
    })
}
/*
    if(this.indice == -1) {
      let produto = new Produto(this.nome, this.preco);
      this.lista_produtos.push(produto);
      alert("Produto cadastrado com sucesso!");
    }
    else {
      this.lista_produtos[this.indice].setNome(this.nome);
      this.lista_produtos[this.indice].setPreco(this.preco);
      alert("Produto alterado com sucesso!");
      this.edicao = false;
      this.indice = -1;
    }
    
    this.nome = undefined;
    this.preco = undefined;
  */

}

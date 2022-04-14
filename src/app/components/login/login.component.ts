import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin : FormGroup;

  constructor(private _router : Router, 
    private usuarioService : UsuarioService, 
    private _formBuilder : FormBuilder) {
      this.formLogin = this._formBuilder.group({
        email : ["", [Validators.required, Validators.email]],
        password : ["", [Validators.required, Validators.minLength(6)]]
      });
     }

  ngOnInit(): void {
  }

  private validarFormulario() {
    for (let campos in this.formLogin.controls) {
      this.formLogin.controls[campos].markAllAsTouched();
    }
  }

  public submitForm (){
    this.validarFormulario();
    if (!this.formLogin.valid) {
      return;
    }
    this.logarComEmailPassword();
  }

  logarComEmailPassword() {
    this.usuarioService.loginComEmailPassword(this.formLogin.controls['email'].value,
    this.formLogin.controls['password'].value)
    .then(() => {
      alert("Login efetuado com sucesso!");
      this._router.navigate(["/listaDeProdutos"]);
    })
    .catch((error) => {
      alert("Erro ao efetuar login, tente novamente!");
      console.log(error)
    })
  }

  logarComGoogleCount() {
    this.usuarioService.loginComGoogleCount()
    .then(() => {
      alert("Login efetuado com sucesso!");
      this._router.navigate(["/listaDeProdutos"]);
    })
    .catch((error) => {
      alert("Erro ao efetuar login, tente novamente!");
      console.log(error)
    })
  }

}
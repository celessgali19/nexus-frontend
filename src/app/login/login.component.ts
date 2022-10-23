import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public message: String
  focus;
  focus1;
  constructor(        
    private router: Router,

    private dataService: ServiciosService,

  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({

      email: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ]),
        contrasena: new FormControl('',
        [
          Validators.required
        ]),
    });
  }
  get email() { return this.loginForm.get('email'); }
  get contrasena() { return this.loginForm.get('contrasena'); }
  login(){

    this.dataService.login({
      email:this.email.value,
      contrasena: this.contrasena.value
    }).subscribe(response => {
      console.log(response)
      if(response.status === 200){
       //enviar a landing
       localStorage.setItem('token', response.token)
       localStorage.setItem('usuario', response.usuario)
       this.router.navigate(['/landing']);

      } else {
        this.message = 'email o contraseña incorrecta'
      }
    })
    
  }

}

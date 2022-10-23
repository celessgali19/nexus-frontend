import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from '../services/servicios.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    public registerForm: FormGroup;
    public message: String

    constructor(
        private router: Router,

        private dataService: ServiciosService,
    ) { }

    ngOnInit() {
        this.registerForm = new FormGroup({

            email: new FormControl('',
                [
                    Validators.required,
                    Validators.pattern(/(.|\s)*\S(.|\s)*/)
                ]),
            contrasena: new FormControl('',
                [
                    Validators.required
                ]),
            nombre: new FormControl('',
                [
                    Validators.required
                ]),
        });
    }
    get email() { return this.registerForm.get('email'); }
    get contrasena() { return this.registerForm.get('contrasena'); }
    get nombre() { return this.registerForm.get('nombre'); }
    register() {
        console.log(this.dataService)
        this.dataService.register({
            email: this.email.value,
            contrasena: this.contrasena.value, 
            nombre: this.nombre.value
        }).subscribe(response => {
            console.log(response)
            if (response.status === 200) {
                //enviar a login
                this.message = 'Usuario creado'
                this.router.navigate(['/login']);
            } else {
                this.message = 'Campos obligatorios'
            }
        })
    }
}

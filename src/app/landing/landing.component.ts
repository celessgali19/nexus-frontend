import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/model';
import { ServiciosService } from '../services/servicios.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;


  public saveForm: FormGroup;
  public message: String

  public product: Product

  constructor(

    private dataService: ServiciosService,

  ) { }

  ngOnInit() {

    this.getdata()
    this.saveForm = new FormGroup({

      email: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ]),
      text: new FormControl('',
        [
          Validators.required
        ]),
      nombre: new FormControl('',
        [
          Validators.required
        ]),
    });
  }
  get email() { return this.saveForm.get('email'); }
  get text() { return this.saveForm.get('text'); }
  get nombre() { return this.saveForm.get('nombre'); }
  getdata() {
    //si existe localstorage si no no se envia nada en los headers
    this.dataService.getPromotions().subscribe(response => {
      console.log(response.result)
      if (response.status === 200) {
        this.product = response.result
      }
    })
  }
  save() {
    this.dataService.save({
        email: this.email.value,
        text: this.text.value, 
        nombre: this.nombre.value
    }).subscribe(response => {
        if (response.status === 200) {
            //enviar a login
            this.message = 'Información enviada'
            this.saveForm.reset()

        } else {
            this.message = 'Campos obligatorios'
        }
    })
  }

}

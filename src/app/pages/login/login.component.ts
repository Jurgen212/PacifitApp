import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { usuarioRecibido } from '../../../interface';
import { PeticionesServService } from '../../services/peticiones-serv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  infoIncorrecta: boolean = false;

  usuarioIntroducido: usuarioRecibido = {
    _id: '',
    nombreUsuario: '',
    nombreCompleto: '',
    masculinofemenino: '',
    contrasena: ''
  };

  constructor( private fb: FormBuilder, private usuarioServ: PeticionesServService, private router: Router  ) { }

  ngOnInit(): void {


    if( this.validarItemsLocal() ){

      this.usuarioIntroducido = JSON.parse( localStorage.getItem('userPaci')! );
      this.usuarioIntroducido.nombreUsuario = JSON.parse( localStorage.getItem('userPaci')! ).usuario;

      this.miFormulario.reset({
        usuario   : this.usuarioIntroducido.nombreUsuario,
        contrasena: this.usuarioIntroducido.contrasena
      })
    }

  }

  usuariosObtenidos: usuarioRecibido[] = [];

  
  miFormulario: FormGroup = this.fb.group({
    usuario       : [  , [ Validators.required ] ],
    contrasena    : [  , [ Validators.required ] ],
  })



  guardar(){

    if( this.miFormulario.valid ){
      
      this.obtenerTodoUsuario();

      
    }
    else{
      this.informacionIncorrecta();
    }
  }


  informacionIncorrecta(){
    this.infoIncorrecta = true;
  }


  obtenerTodoUsuario(){

    this.usuarioServ.getUsuariosRegistrador()
    .subscribe( data => { 

      this.usuariosObtenidos = data 

      if( this.validarExistencia() ){

        this.manejoLocalStorage();
        this.validarAdmin();
      };
      });
    
  }



  validarExistencia(): boolean{
    

    for( let i = 0; i < this.usuariosObtenidos.length; i++ ){

      if( this.miFormulario.value.usuario == this.usuariosObtenidos[i].nombreUsuario ){

        if( this.miFormulario.value.contrasena == this.usuariosObtenidos[i].contrasena ){
         
          this.usuarioIntroducido = this.usuariosObtenidos[i];
          this.infoIncorrecta = false;
          return true;
        }
      }
    }  
    
    this.informacionIncorrecta();
    return false;
  }



  manejoLocalStorage(){


    let usuarioGuardado = {
      'usuario'   : this.usuarioIntroducido.nombreUsuario,
      'contrasena': this.usuarioIntroducido.contrasena,
      'id'        : this.usuarioIntroducido._id,
      'nombreCompleto': this.usuarioIntroducido.nombreCompleto,
      'masculinofemenino': this.usuarioIntroducido.masculinofemenino

    }
    console.log( this.usuarioIntroducido._id)
    localStorage.removeItem('userPaci');
    localStorage.setItem('userPaci', JSON.stringify( usuarioGuardado ));
  }


  validarItemsLocal(){

    if( localStorage.getItem('userPaci') != undefined ) return true;
    else return false;

  }



  validarAdmin(){

      if( JSON.parse( localStorage.getItem('userPaci')! ).id == "629d1b436efd6dd562cd4856" ){
        console.log("admin");
        this.router.navigate(['./admin/'])
      }
      else{
        console.log("no admin");
        this.router.navigate(['./user/userPage']);
      }
  }
}

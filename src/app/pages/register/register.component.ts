import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { usuarioEnviado, usuarioRecibido } from '../../../interface';
import { PeticionesServService } from '../../services/peticiones-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuarioEnviar: usuarioEnviado = {
    nombreUsuario:      '',
    nombreCompleto:     '',
    masculinofemenino:  '',
    contrasena:         ''
  }

  usuariosRecibidos: usuarioRecibido[] = [];

  errorFormulario : boolean = false;
  usuarioExistente: boolean = false;


  constructor( private fb: FormBuilder, private userServ: PeticionesServService, private router: Router  ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      usuario       : '',
      nombre        : '',
      contrasena    : '',
      contraseñaRep : '',
      genero        : ''
    })
  }

  miFormulario: FormGroup = this.fb.group({
    usuario       : [  , [ Validators.required, Validators.maxLength( 20 ) ] ],
    nombre        : [  , [ Validators.required, Validators.maxLength( 20 ) ] ],
    contrasena    : [  , [ Validators.required ] ],
    contrasenaRep : [  , [ Validators.required ] ],
    genero        : [  , [ Validators.required ] ]
  })


  guardar(){

    if( this.miFormulario.valid && this.miFormulario.value.contrasena == this.miFormulario.value.contrasenaRep ){
      this.errorFormulario = false;

      this.validarSiExiste();
    }
    else{
      this.errorAlEnviarDatos();
    }
  }


  errorAlEnviarDatos(){
    this.errorFormulario = true;
  }


  validarSiExiste() {

    this.userServ.getUsuariosRegistrador()
    .subscribe( data =>{

      this.usuariosRecibidos = data;

      for( let i = 0; i < this.usuariosRecibidos.length; i++ ){
      
        console.log( this.usuariosRecibidos[i].nombreUsuario);
        if( this.miFormulario.value.usuario == this.usuariosRecibidos[i].nombreUsuario ){
          console.log("Exist")
          this.usuarioExistente = true;
          return true;
        }
      }
      
      this.usuarioExistente = false;
      this.llenarInfoUsuario();
      return true;
    } );
  }


  llenarInfoUsuario(){
   
    this.usuarioEnviar.nombreCompleto = this.miFormulario.value.nombre    ;
    this.usuarioEnviar.nombreUsuario  = this.miFormulario.value.usuario   ; 
    this.usuarioEnviar.contrasena     = this.miFormulario.value.contrasena;
    

    if( this.miFormulario.value.genero == "Mujer") this.usuarioEnviar.masculinofemenino = "Femenino";
    
    else this.usuarioEnviar.masculinofemenino = "Masculino";

    this.enviarUsuario();
  }


  enviarUsuario(){

    console.log("hi")
    this.userServ.postUsuarioNuevo( this.usuarioEnviar ).
    subscribe( data => { 
      console.log( data );
      this.router.navigate(['./home/login']);
    });
  }
}

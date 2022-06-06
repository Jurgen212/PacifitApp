import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { recibirSolicitudes } from 'src/interface';
import { PeticionesServService } from '../../services/peticiones-serv.service';
import { usuarioRecibido, enviarSolicitud } from '../../../interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  infoIncorrecta: boolean = false;
  
  valoresLocalStorage: usuarioRecibido = {
    _id: '',
    nombreUsuario: '',
    nombreCompleto: '',
    masculinofemenino: '',
    contrasena: ''
  }


  usuarioAEnviar: enviarSolicitud = {
    cantidadRepeticiones: 0,
    estadoSolicitud: 0,
    masculinofemenino: '',
    nombreCompleto: '',
    id: '',
    nombreUsuario: ''
  }


  arregloSolicitud: recibirSolicitudes[] = [];


  constructor( private fb: FormBuilder, private petServ: PeticionesServService ) { }

  ngOnInit(): void {

    this.valoresLocalStorage.nombreUsuario      = JSON.parse( localStorage.getItem('userPaci')! ).usuario;
    this.valoresLocalStorage.contrasena         = JSON.parse( localStorage.getItem('userPaci')! ).contrasena;
    this.valoresLocalStorage._id                = JSON.parse( localStorage.getItem('userPaci')! ).id;
    this.valoresLocalStorage.nombreCompleto     = JSON.parse( localStorage.getItem('userPaci')! ).nombreCompleto;
    this.valoresLocalStorage.masculinofemenino  = JSON.parse( localStorage.getItem('userPaci')! ).masculinofemenino;


    this.usuarioAEnviar.nombreCompleto      = this.valoresLocalStorage.nombreCompleto   ;
    this.usuarioAEnviar.id                  =  this.valoresLocalStorage._id             ;
    this.usuarioAEnviar.masculinofemenino   = this.valoresLocalStorage.masculinofemenino;
    this.usuarioAEnviar.cantidadRepeticiones= 0;
    this.usuarioAEnviar.estadoSolicitud     = 0;
    this.usuarioAEnviar.nombreUsuario       = this.valoresLocalStorage.nombreUsuario; 
  }


  miFormulario: FormGroup = this.fb.group({
    puntos      : [  , [ Validators.required ] ]
  })



  guardar(){

    if( this.miFormulario.valid && !isNaN(this.miFormulario.value.puntos) && this.miFormulario.value.puntos > 0 ){
      this.infoIncorrecta = false;
      
      this.petServ.getSolicitudesAdmin().subscribe( data => {

        this.arregloSolicitud = data;
        this.actualizarInformacion();
        }
      );
      
    }
    else{
      this.informacionIncorrecta();
    }
  }




  informacionIncorrecta(){
    this.infoIncorrecta = true;
  }

  cerrar(){
    localStorage.removeItem('userPaci');
  }


  añadirSolicitud(){

    console.log( this.usuarioAEnviar )
    this.petServ.postSolicitudAlAdmin( this.usuarioAEnviar ).subscribe( data => console.log( data ) );

    this.miFormulario.reset({
      puntos: ''
    })
  }

  actualizarInformacion(){
   
    for( let i = 0; i < this.arregloSolicitud.length; i++ ){
      
      if( this.usuarioAEnviar.nombreUsuario == this.arregloSolicitud[i].nombreUsuario){
  
        this.actualizarSolicitudExistente( this.arregloSolicitud[i]._id, i );
        return;
      }
    }

    this.crearSolicitudUsuario();
    return;
  }


  crearSolicitudUsuario(){

    this.usuarioAEnviar.cantidadRepeticiones  = this.miFormulario.value.puntos;
    this.usuarioAEnviar.estadoSolicitud       = 1;
    

    this.añadirSolicitud();
  }



  actualizarSolicitudExistente( id : string, i: number ){

    this.usuarioAEnviar.cantidadRepeticiones =  parseInt( this.miFormulario.value.puntos ) + this.arregloSolicitud[i].cantidadRepeticiones;
    this.usuarioAEnviar.estadoSolicitud      = 1;
    this.usuarioAEnviar.nombreUsuario        = this.arregloSolicitud[i].nombreUsuario;

    this.petServ.eliminarRegistroParaActualizar( id )
    .subscribe( data => {

      this.añadirSolicitud()
    })
  }
}

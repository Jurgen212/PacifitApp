import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { recibirSolicitudes, RecibirPodium, añadirAlPodium } from '../../../interface';
import { PeticionesServService } from '../../services/peticiones-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor( private petSer: PeticionesServService, private router: Router ) { }

  arregloSolicitudespendientes: recibirSolicitudes[] = [];
  arregloPodium               : RecibirPodium[]      = [];

  añadirObjetoAlPodium        : añadirAlPodium        = {
    id: '',
    nombreCompleto: '',
    cantidadRepeticiones: 0,
    masculinofemenino: '',
    nombreUsuario: ''
  }


  ngOnInit(): void {

    this.petSer.getSolicitudesAdmin().subscribe( data => this.arregloSolicitudespendientes = data );
  }

  cerrar(){
    localStorage.removeItem('userPaci');
  }



  aceptar( index: number ){

    this.petSer.getAllPodium().subscribe( data =>{
      console.log( data );
      this.arregloPodium = data;
      
      this.validarSiYaExisteEnPodium( index );
      
    })
    
  }


  eliminar( index: number ){
      this.borrarRegistroDeSolicitud( index );
  }



  borrarRegistroDeSolicitud( index: number ){
    this.petSer.eliminarRegistroParaActualizar( this.arregloSolicitudespendientes[index]._id ).subscribe( data => {   
      this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this.router.navigate(["/admin/adminPage"]));
    });
  }



  validarSiYaExisteEnPodium( index: number ){

    for( let i = 0; i < this.arregloPodium.length; i++ ){

      
      if( this.arregloSolicitudespendientes[index].nombreUsuario == this.arregloPodium[i].nombreUsuario ){

        
        console.log("existe");
        this.añadirDatosNuevos( index );
        console.log( this.arregloPodium[i]._id );
        this.añadirObjetoAlPodium.cantidadRepeticiones = this.arregloPodium[i].cantidadRepeticiones + this.arregloSolicitudespendientes[index].cantidadRepeticiones;
        
        this.borrarPuntuacionVieja( this.arregloPodium[i]._id, index );
        return;
      }
    }
    
    console.log( "No existe")
    this.añadirDatosNuevos( index );
    this.añadirObjetoAlPodium.cantidadRepeticiones = this.arregloSolicitudespendientes[index].cantidadRepeticiones;
    this.añadirPuntuacion( index );
  }


  añadirDatosNuevos( index: number ){

    this.añadirObjetoAlPodium.id                = this.arregloSolicitudespendientes[index]._id              ;
    this.añadirObjetoAlPodium.masculinofemenino = this.arregloSolicitudespendientes[index].masculinofemenino;
    this.añadirObjetoAlPodium.nombreCompleto    = this.arregloSolicitudespendientes[index].nombreCompleto   ;
    this.añadirObjetoAlPodium.nombreUsuario     = this.arregloSolicitudespendientes[index].nombreUsuario    ;
  }


  borrarPuntuacionVieja( id: string, index: number  ){
    this.petSer.deletePodium( id ).subscribe( data =>{

      this.añadirPuntuacion( index );
    })
  }

  añadirPuntuacion( index: number  ){
    
    this.petSer.postPodium( this.añadirObjetoAlPodium ).subscribe( data => {
      
      this.borrarRegistroDeSolicitud( index );
    });
  }
}

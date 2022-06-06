import { Component, OnInit } from '@angular/core';
import { RecibirPodium } from '../../../interface';
import { PeticionesServService } from '../../services/peticiones-serv.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit {


  arregloHombresPodium: RecibirPodium[] = [];
  arregloMujeresPodium: RecibirPodium[] = [];

  arregloGeneral      : RecibirPodium[] = [];


  constructor( private petServ: PeticionesServService ) { }

    
  ngOnInit(): void {

    this.petServ.getAllPodium()
    .subscribe( data => {

      this.arregloGeneral = data;
      this.dividirArrays();
     
    })
  }

  dividirArrays(){

    for( let i = 0; i < this.arregloGeneral.length; i++ ){
      if( this.arregloGeneral[i].masculinofemenino == "Masculino" ) this.arregloHombresPodium.push( this.arregloGeneral[i] );
      else this.arregloMujeresPodium.push( this.arregloGeneral[i] );
    }
    
    this.inserctionHombres();
    this.inserctionMujeres();
  }



 inserctionHombres( ){

  let guardado_inserction: RecibirPodium;
 
 for( let i = 0; i < this.arregloHombresPodium.length; i++){
    
    for( let j = i + 1; j < this.arregloHombresPodium.length; j ++){
 
       if( this.arregloHombresPodium[ i ].cantidadRepeticiones < this.arregloHombresPodium[ j ].cantidadRepeticiones ){
 
          guardado_inserction = this.arregloHombresPodium[i];
          this.arregloHombresPodium[ i ] = this.arregloHombresPodium[j];
          this.arregloHombresPodium[ j ] = guardado_inserction; 
       }
    }
 }
}




inserctionMujeres( ){

  let guardado_inserction: RecibirPodium;
 
 for( let i = 0; i < this.arregloMujeresPodium.length; i++){
    
    for( let j = i + 1; j < this.arregloMujeresPodium.length; j ++){
 
       if( this.arregloMujeresPodium[ i ].cantidadRepeticiones < this.arregloMujeresPodium[ j ].cantidadRepeticiones ){
 
          guardado_inserction = this.arregloMujeresPodium[i];
          this.arregloMujeresPodium[ i ] = this.arregloMujeresPodium[j];
          this.arregloMujeresPodium[ j ] = guardado_inserction; 
       }
    }
 }
}

}

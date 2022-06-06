import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecibirPodium, añadirAlPodium, usuarioEnviado, usuarioRecibido, enviarSolicitud, recibirSolicitudes } from '../../interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PeticionesServService {

  constructor( private http: HttpClient ) { }

  podiumLink  : string = environment.API_PODIUM   ;
  usuarioLink : string = environment.API_USUARIOS ;
  solicituLink: string = environment.API_SOLICITUD;



  getAllPodium():Observable<RecibirPodium[]>{
    return this.http.get<RecibirPodium[]>(`${ this.podiumLink}`);
  }

  postPodium( usuario: añadirAlPodium ): Observable<añadirAlPodium>{
    return this.http.post<añadirAlPodium>(`${ this.podiumLink }`, usuario);
  }


  deletePodium( id: string ): Observable<añadirAlPodium>{
    return this.http.delete<añadirAlPodium>(`${ this.podiumLink }/${ id }`);
  }





  postUsuarioNuevo( usuarioEnviado: usuarioEnviado ): Observable<usuarioEnviado>{
    return this.http.post<usuarioEnviado>(`${ this.usuarioLink }`, usuarioEnviado );
  }


  getUsuariosRegistrador(): Observable<usuarioRecibido[]>{
    return this.http.get<usuarioRecibido[]>(`${ this.usuarioLink }`);
  }

  getUsuarioRegistradoId(): Observable<usuarioRecibido>{
    return this.http.get<usuarioRecibido>(`${ this.usuarioLink }`);
  }





  eliminarRegistroParaActualizar( id: string ): Observable<enviarSolicitud>{
    return this.http.delete<enviarSolicitud>(`${ this.solicituLink }/${ id }`);
  }

  postSolicitudAlAdmin( solicitud: enviarSolicitud ): Observable<enviarSolicitud>{

    return this.http.post<enviarSolicitud>(`${  this.solicituLink }`, solicitud );
  }


  getSolicitudesAdmin(): Observable<recibirSolicitudes[]>{
    return this.http.get<recibirSolicitudes[]>(`${ this.solicituLink }` );
  }
}

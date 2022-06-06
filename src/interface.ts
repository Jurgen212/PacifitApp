

export interface usuarioRecibido {
    _id:                string;
    nombreUsuario:     string;
    nombreCompleto:    string;
    masculinofemenino: string;
    contrasena:        string;
    createdAt?:         Date;
    updatedAt?:         Date;
}

export interface usuarioEnviado {
    nombreUsuario:     string;
    nombreCompleto:    string;
    masculinofemenino: string;
    contrasena:        string;
}


export interface recibirSolicitudes {
    _id:                   string;
    nombreCompleto:       string;
    cantidadRepeticiones: number;
    masculinofemenino:    string;
    estadoSolicitud:      number;
    createdAt:            Date;
    updatedAt:            Date;
    nombreUsuario:        string;
}


export interface enviarSolicitud {
    cantidadRepeticiones: number;
    estadoSolicitud:      number;
    masculinofemenino:    string;
    nombreCompleto:       string;
    id:                   string;
    nombreUsuario:        string;
}



export interface RecibirPodium {
    _id:                   string;
    nombreCompleto:       string;
    cantidadRepeticiones: number;
    masculinofemenino:    string;
    createdAt:            Date;
    updatedAt:            Date;
    nombreUsuario:        string;
}


export interface añadirAlPodium {
    id:                   string;
    nombreCompleto:       string;
    cantidadRepeticiones: number;
    masculinofemenino:    string;
    nombreUsuario:        string;
}

export class Propuesta {

    id: number;
    licitacionId: number;
    nombre: string;
    descripcion: string;
    nombreCliente: string;
    valor: number;
    puntaje?: number;
    fechaCreacion: Date;
    fechaPublicacion?: Date;
    estado?: number;

    constructor(
        id: number, licitacionId: number, nombre: string, descripcion: string, nombreCliente: string,
        valor: number, puntaje: number, fechaCreacion: Date, fechaPublicacion: Date, estado: number) {
            this.id = id;
            this.licitacionId = licitacionId;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.nombreCliente = nombreCliente;
            this.valor = valor;
            this.puntaje = puntaje;
            this.fechaCreacion = fechaCreacion;
            this.fechaPublicacion = fechaPublicacion;
            this.estado = estado;
        }
}

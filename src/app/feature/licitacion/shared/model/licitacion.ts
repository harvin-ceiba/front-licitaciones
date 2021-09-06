export class Licitacion {

    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    presupuesto: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado?: number;

    constructor(
        id: number, codigo: string, nombre: string, descripcion: string, presupuesto: number,
        fechaInicio: Date, fechaFin: Date, estado: number) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.presupuesto = presupuesto;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
    }
}

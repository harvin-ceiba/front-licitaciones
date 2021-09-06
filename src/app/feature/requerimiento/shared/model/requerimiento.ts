export class Requerimiento {

    id: number;
    descripcion: string;
    estado: number;

    constructor(id: number, descripcion: string, estado: number) {
        this.id = id;
        this.descripcion = descripcion;
        this.estado = estado;
    }

}

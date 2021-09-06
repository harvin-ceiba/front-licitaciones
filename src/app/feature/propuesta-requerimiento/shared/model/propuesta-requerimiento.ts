export class PropuestaRequerimiento {

    id: number;
    propuestaId: number;
    requerimientoId: number;

    constructor(id: number, propuestaId: number, requerimientoId: number) {
        this.id = id;
        this.propuestaId = propuestaId;
        this.requerimientoId = requerimientoId;
    }

}

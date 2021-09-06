export class LicitacionRequerimiento {

    id: number;
    licitacionId: number;
    requerimientoId: number;
    pesoPorcentual: number;

    constructor(id: number, licitacionId: number, requerimientoId: number, pesoPorcentual: number) {
        this.id = id;
        this.licitacionId = licitacionId;
        this.requerimientoId = requerimientoId;
        this.pesoPorcentual = pesoPorcentual;
    }

}

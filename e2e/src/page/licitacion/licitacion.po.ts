import { by, element } from 'protractor';

export class LicitacionPage {

    private linkListarLicitaciones = element(by.id('linkListarLicitacion'));
    private linkCrearLicitacion = element(by.id('linkCrearLicitacion'));

    private inputCodigoLicitacion = element(by.id('codigo_licitacion'));
    private inputNombreLicitacion = element(by.id('nombre_licitacion'));
    private inputDescripcionLicitacion = element(by.id('descripcion_licitacion'));
    private inputFechaInicioLicitacion = element(by.id('fecha_inicio_licitacion'));
    private inputFechaFinLicitacion = element(by.id('fecha_fin_licitacion'));
    private inputPresupuestoLicitacion = element(by.id('presupuesto_licitacion'));
    private buttonGuardarLicitacion = element(by.id('buttonGuardarLicitacion'));

    private divMensajeAlGuardar =  element(by.id('id-custom-message'));

    private listaLicitaciones = element.all(by.css('div.panel-licitacion'));
    
    async clickBotonListarLicitaciones() {
        await this.linkListarLicitaciones.click();
    }

    async clickBotonCrearLicitaciones() {
        await this.linkCrearLicitacion.click();
    }

    async ingresarCodigo(codigo) {
        await this.inputCodigoLicitacion.sendKeys(codigo);
    }

    async ingresarNombre(nombre) {
        await this.inputNombreLicitacion.sendKeys(nombre);
    }

    async ingresarDescripcion(descripcion) {
        await this.inputDescripcionLicitacion.sendKeys(descripcion);
    }

    async ingresarFechaInicio(fechaInicio) {
        await this.inputFechaInicioLicitacion.sendKeys(fechaInicio);
    }

    async ingresarFechaFin(fechaFin) {
        await this.inputFechaFinLicitacion.sendKeys(fechaFin);
    }

    async ingresarPresupuesto(presupuesto) {
        await this.inputPresupuestoLicitacion.sendKeys(presupuesto);
    }

    async clickBotonGuardarLicitacion() {
        await this.buttonGuardarLicitacion.click();
    }

    async contarLicitaciones() {
        return this.listaLicitaciones.count();
    }

    obtenerElementoMensaje() {
        return this.divMensajeAlGuardar;
    }

    getFakeString(length) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for ( let i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
}

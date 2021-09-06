import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { LicitacionPage } from '../page/licitacion/licitacion.po';
import { browser } from 'protractor';

const NUMERO_LICITACIONES = 21;

describe('workspace-project Licitacion', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let licitacion: LicitacionPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        licitacion = new LicitacionPage();
    });

    it('Deberia registrar la licitacion', async () => {
        // Arrange
        const CODIGO_LICITACION = licitacion.getFakeString(10);
        const NOMBRE_LICITACION = 'TITULO_LICITACION_1';
        const DESCRIPCION_LICITACION = 'DESCRIPCION_1';
        const FECHA_INICIO_LICITACION = '09/01/2021';
        const FECHA_FIN_LICITACION = '09/30/2021';
        const PRESUPUESTO_LICITACION = 2000000;

        page.navigateTo();
        navBar.clickBotonGestionLicitaciones();

        await browser.sleep(3000);

        licitacion.clickBotonCrearLicitaciones();
        licitacion.ingresarCodigo(CODIGO_LICITACION);
        licitacion.ingresarNombre(NOMBRE_LICITACION);
        licitacion.ingresarDescripcion(DESCRIPCION_LICITACION);
        licitacion.ingresarFechaInicio(FECHA_INICIO_LICITACION);
        licitacion.ingresarFechaFin(FECHA_FIN_LICITACION);
        licitacion.ingresarPresupuesto(PRESUPUESTO_LICITACION);

        // Act
        licitacion.clickBotonGuardarLicitacion();
        await browser.sleep(3000);

        // Assert
        expect(licitacion.obtenerElementoMensaje().isDisplayed()).toEqual(true);
        expect(licitacion.obtenerElementoMensaje().getAttribute('class')).toEqual('custom-message-success');
    });

    it('Deberia listar licitacions', () => {
        page.navigateTo();
        navBar.clickBotonGestionLicitaciones();
        licitacion.clickBotonListarLicitaciones();

        expect(NUMERO_LICITACIONES).toBe(licitacion.contarLicitaciones());
    });
});

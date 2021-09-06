import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkGestionLicitaciones = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkMisPropuestas = element(by.xpath('/html/body/app-root/app-navbar/nav/a[3]'));

    async clickBotonGestionLicitaciones() {
        await this.linkGestionLicitaciones.click();
    }

    async clickBotonMisPropuestas() {
        await this.linkMisPropuestas.click();
    }
}

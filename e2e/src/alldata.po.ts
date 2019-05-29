import { browser, by, element } from 'protractor';

export class AllDataPage {

  navigateTo() {
    return browser.get('/alldata');
  }

  getTableTitle() {
    return element(by.css('[name="tituloTabla"]'));
  }

}

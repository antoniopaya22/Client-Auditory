import { browser, by, element } from 'protractor';

export class HomePage {

  navigateTo() {
    return browser.get('/');
  }

  getGraficaTitle() {
    return element(by.css('[name="temperaturaDevice"]'));
  }

  getLogout() {
    return element(by.css('[name="logout"]'));
  }

}

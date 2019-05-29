import { browser, by, element } from 'protractor';

export class LoginPage {

  private credentials = {
    username: 'auditor',
    password: 'auditor'
  };

  navigateTo() {
    return browser.get('/');
  }

  getUsernameInput() {
    return element(by.css('[name="username"]'));
  }

  getPasswordInput() {
    return element(by.css('[name="password"]'));
  }

  getLoginButton() {
    return element(by.css('[type="submit"]'));
  }

  fillCredentials(credentials: any = this.credentials){
    this.getUsernameInput().sendKeys(credentials.username);
    this.getPasswordInput().sendKeys(credentials.password);
    this.getLoginButton().click();
  }
}

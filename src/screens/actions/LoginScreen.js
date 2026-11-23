import { until } from "selenium-webdriver";
import LoginLocators from "../locators/loginLocator.js";

class LoginScreen {
  constructor(driver) {
    this.driver = driver;
  }

  async openLoginForm() {
    const menuBtn = await this.driver.wait(
      until.elementLocated(LoginLocators.menuIcon),
      5000,
    );
    await menuBtn.click();

    const loginMenu = await this.driver.wait(
      until.elementLocated(LoginLocators.loginMenuItem),
      5000,
    );
    await loginMenu.click();
  }

  async login(username, password) {
    const userField = await this.driver.wait(
      until.elementLocated(LoginLocators.usernameInput),
      5000,
    );
    await userField.sendKeys(username);

    const passField = await this.driver.findElement(
      LoginLocators.passwordInput,
    );
    await passField.sendKeys(password);

    const submitBtn = await this.driver.findElement(LoginLocators.loginButton);
    await submitBtn.click();
  }

  async getCatalogTitle() {
    const titleEl = await this.driver.wait(
      until.elementLocated(LoginLocators.catalogTitle),
      5000,
    );
    return await titleEl.getText();
  }
}

export default LoginScreen;

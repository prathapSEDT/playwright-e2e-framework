import homePageLocator from '../locators/homepage.json'
import WebLib from "../utils/webutils/webutils";

export default class Homepage extends WebLib {
    async navigateToRegistrationPage() {
        await this.clickElement(homePageLocator['register'])
    }
    async navigateToLoginPage() {
        await this.clickElement(homePageLocator['login'])
    }
}

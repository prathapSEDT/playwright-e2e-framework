import homePageLocator from '../locators/homepage.json'
import WebLib from "../utils/webutils/webutils";

export default class Homepage extends WebLib {
    async navigateToRegistrationPage() {
        await this.clickElement(homePageLocator['register'])
    }
    async navigateToLoginPage() {
        await this.clickElement(homePageLocator['login'])
    }
    async navigateToWishlistPage() {
        await this.clickElement(homePageLocator['wishlist'])
}
 async navigateTocomputersPage() {
        await this.clickElement(homePageLocator['computers'])
}
async navigateToElectronicsPage(){
    await this.clickElement(homePageLocator['electronics'])
}
async navigateToApparelPage(){
    await this.clickElement(homePageLocator['apparel'])
}
async navigateToDigitaldownloadPage(){
    await this.clickElement(homePageLocator['digitaldownload'])
}
async navigateToBooksPage(){
    await this.clickElement(homePageLocator['books'])
}
async navigateToJewelryPage(){
    await this.clickElement(homePageLocator['jewelry'])
}
async navigateToGiftCardsPage(){
    await this.clickElement(homePageLocator['giftCards'])
}
}

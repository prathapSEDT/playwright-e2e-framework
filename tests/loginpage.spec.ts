import test from '@playwright/test';
import WebLib from '../utils/webutils/webutils';
import Loginpage from '../capabilities/loginpage';
import Homepage from '../capabilities/homepage'

test("login page",async({page})=>{
    const webutil = new WebLib(page)
    await webutil.launchApplication()

    const homePage = new Homepage(page)
    await homePage.navigateToLoginPage()

    const loginPage = new Loginpage(page)
    await loginPage.loginCredentials(page,"gmsrinivas1544@gmail.com","12345678")
    await loginPage.rememberMe(page)
    await loginPage.forgotPassword(page)
    await page.pause()
    await loginPage.showPassword(page)
    await loginPage.hidePassword(page)
    await loginPage.login(page)

})

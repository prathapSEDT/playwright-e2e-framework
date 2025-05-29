import { expect, Page } from '@playwright/test'
import loginPageLocators from '../locators/login-page-locators.json'
import WebLib from '../utils/webutils/webutils'

export default class Loginpage extends WebLib {
    async loginCredentials(page : Page, email : string, password : string)
    {
        try
        {
            const emailLocator = page.locator(loginPageLocators['customer_email'].property)
            await this.fillData(emailLocator,email)
            const passwordLocator = page.locator(loginPageLocators['customer_password'].property)
            await this.fillData(passwordLocator,password)
        }
        catch(error)
        {
            console.error("Unable to fill the credentials",error)
        }
    }
    async rememberMe(page:Page)
    {
        try
        {
            const rememberMeLocator = page.locator(loginPageLocators['rememberme_checkbox'].property)
            await rememberMeLocator.check()
        }
        catch(error)
        {
            console.error("unable to check rememberme checkbox")
        }
    }
    async login(page:Page)
    {
        try
        {
            const loginButtonLocator = page.locator(loginPageLocators['login_button'].property)
            await loginButtonLocator.click()
        }
        catch(error)
        {
            console.error("unable to login",error)
        }
    }
    async showPassword(page : Page)
    {
        try
        {
            const showButtonLocator = page.locator(loginPageLocators['show_password'].property)
            await showButtonLocator.click()
        }
        catch(error)
        {
            console.error("Unable to click on show password button",error)
        }
    }
    async hidePassword(page:Page)
    {
        try
        {
            const hideButtonLocator = page.locator(loginPageLocators['hide_password'].property)
            await hideButtonLocator.click()
        }
        catch(error)
        {
            console.error("Unable to click on hide password button",error)
        }
    }
    async forgotPassword(page:Page){
        try 
        {
            const forgotPasswordLocator = page.locator(loginPageLocators['forgot_password'].property)
            await expect(forgotPasswordLocator).toHaveText("Forgot password?")
            await forgotPasswordLocator.click()
        }
        catch(error)
        {
            console.error("unable to click on the forgot password ",error)
        }
    }
    
}
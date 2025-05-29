import { expect, Page } from '@playwright/test'
import loginPageLocators from '../locators/login-page-locators.json'
import WebLib from '../utils/webutils/webutils'

export default class Loginpage extends WebLib {
    async loginCredentials(email : string, password :string)
    {
        try
        {
            const emailLocator = this.page.locator(loginPageLocators['customer_email'].property)
            await this.fillData(emailLocator,email)
            const passwordLocator = this.page.locator(loginPageLocators['customer_password'].property)
            await this.fillData(passwordLocator,password)
        }
        catch(error)
        {
            console.error("Unable to fill the credentials",error)
        }
    }
    async rememberMe()
    {
        try
        {
            const rememberMeLocator = this.page.locator(loginPageLocators['rememberme_checkbox'].property)
            await rememberMeLocator.check()
        }
        catch(error)
        {
            console.error("unable to check rememberme checkbox")
        }
    }
    async login()
    {
        try
        {
            const loginButtonLocator = this.page.locator(loginPageLocators['login_button'].property)
            await loginButtonLocator.click()
        }
        catch(error)
        {
            console.error("unable to login",error)
        }
    }
    async showPassword()
    {
        try
        {
            const showButtonLocator = this.page.locator(loginPageLocators['show_password'].property)
            await showButtonLocator.click()
        }
        catch(error)
        {
            console.error("Unable to click on show password button",error)
        }
    }
    async hidePassword()
    {
        try
        {
            const hideButtonLocator = this.page.locator(loginPageLocators['hide_password'].property)
            await hideButtonLocator.click()
        }
        catch(error)
        {
            console.error("Unable to click on hide password button",error)
        }
    }
    async forgotPassword(){
        try 
        {
            const forgotPasswordLocator = this.page.locator(loginPageLocators['forgot_password'].property)
            await expect(forgotPasswordLocator).toHaveText("Forgot password?")
            await forgotPasswordLocator.click()
        }
        catch(error)
        {
            console.error("unable to click on the forgot password ",error)
        }
    }
    
}
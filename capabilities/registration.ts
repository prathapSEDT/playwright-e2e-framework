import registrationLocators from '../locators/registration.json'
import WebLib from "../utils/webutils/webutils";

export default class RegistrationPage extends WebLib {
    async regNavigateToRegistrationPage()
     {
        await this.clickElement(registrationLocators['register'])
    }
    async regcheckText() {
        await this.getTextFromElement(registrationLocators['header_text_check'])
        await this.getTextFromElement(registrationLocators['header_personaldetails_check'])
    
    }
    async regSelectRadioButton(){
        await this.clickElement(registrationLocators['click_radio_button_male'])
        await this.clickElement(registrationLocators['click_radio_button_female'])

    }
    async regFillData(){
           
           await this.clickElementAndFill(registrationLocators['property'],['fill_text_firstname'],this.getTextFromElement)
           await this.clickElementAndFill(registrationLocators['property'],['fill_text_lastname'],this.getTextFromElement)
           await this.clickElementAndFill(registrationLocators['property'],['fill_text_lastname'],this.getTextFromElement)
    }
     async regcheckTextCompany() {
        await this.getTextFromElement(registrationLocators['check_text_company'])
           
    }
    async regFillCompanyData(){
           
       await this.clickElementAndFill(registrationLocators['property'],['fill_text_company'],this.getTextFromElement)
    }
  async regcheckTextOptions() {
        await this.getTextFromElement(registrationLocators['check_text_options'])
           
    }

    async regClickNewsletter(){
        await this.clickElement(registrationLocators['click_checkbox_newsletter'])

    }
    async regcheckTextPassword() {
        await this.getTextFromElement(registrationLocators['check_text_password'])
           
    }
   async regFillTextPassword(){
           
       await this.clickElementAndFill(registrationLocators['property'],['fill_text_password'],this.getTextFromElement)
       await this.clickElementAndFill(registrationLocators['property'],['fill_text_confirm_password'],this.getTextFromElement)
    }
    async regClickRegisterButton(){
        await this.clickElement(registrationLocators['click_register_button'])
      
    }

}
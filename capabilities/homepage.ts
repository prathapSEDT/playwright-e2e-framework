import { Locator } from "@playwright/test"

export default class Homepage{
 async navigateToRegistrationPage()  {
console.log("navigate to registration page")
 }

 
  async elementIsExist(webElement:Locator):Promise<boolean>{
    try{
return await webElement.isVisible()
    }catch(error){

    
    return false

    }
 }
    
}
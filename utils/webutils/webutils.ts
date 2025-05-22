
import configData from '/Users/chota/Documents/playwright-e2e-framework/app-config/app-config.json'
import {expect, Locator, Page} from '@playwright/test'

export default class WebLib {
page :Page
    constructor(page :Page){
        this.page = page

    }
/*
Author: S.Kiran
Date: 21 May 2025
Modified by:
Modified Date:
Purpose to modify:

@method name:launchBrowser
@purpose: launches the browser and navigates to the URL secified in configData.env
*/
 async launchbrowser(): Promise<boolean>{
    let env :any = configData.env //qa,uat,staging etc
    let envDetails = configData[env]
    let weburl :any = envDetails["web_Url"]

// environment variables from playwright -config file
 // let exe_env = process.env.EXEC
 // let weburl :any = process.env.QA
    try {

        await this.page.goto(weburl)
        return true
    } 
    catch (error) {
        console.error(error)
        return false
    }
}

/*
Author: S.Kiran
Date: 21 May 2025
Modified by:
Modified Date:
Purpose to modify:

@method name:fillData
@purpose: It accepts webelement as locator and inputdata to accept the value.
This method calls waitForWebElement in turn to check it exists before accepting a value
*/ 

async fillData(webElement : Locator, inputdata : string): Promise<boolean>{
    let actionStatus :boolean = false
        try { 
                    let status : boolean = await this.waitForWebElement(webElement)
                    if (status){
                        await webElement.clear()
                        await webElement.fill(inputdata)
                        actionStatus = true
                    }

        } catch (error) {
                        actionStatus = false
        } return actionStatus
             
    }

  /*
Author: S.Kiran
Date: 21 May 2025
Modified by:
Modified Date:
Purpose to modify:

@method name:waitForWebElement
@purpose: This method passes webelement as locator and wait for time given to complete other methods waitforloadstate with domcontentloaded,load and networkidle
This method is used as re-usable method for loading webelements
*/ 

async waitForWebElement(webElement : Locator, time : number =35000): Promise<boolean>{
            try { 
                await this.page.waitForLoadState("domcontentloaded")
                await this.page.waitForLoadState("load")
                await this.page.waitForLoadState("networkidle")
                await expect(webElement).toBeVisible({timeout :time})
                return true
            } catch (error) {

                return false}
            }
        


        /*
Author: Rakesh
Date: 22 May 2025
Modified by:
Modified Date:
Purpose to modify:
*/

async getTextFromElement(element: any): Promise<any> {
        try {
            const text = await element.getTextFromElement();
            console.log("Enter the text :", text);
            return text;
        } catch(error){
console.error(error)
return false
}
 }



    async clickElementAndFill(elementProperty: any, elementName: any, txtToFill: any) {
        try {
            await elementProperty.click();
            await elementProperty.setValue(txtToFill);
            console.log(`Filled ${elementName} with: ${txtToFill}`);
        } catch(error){
console.error(error)
return false
        }
    }

    

    
    async selectDropDown(elementProperty: any, option: string) {
        try {
            await elementProperty.selectByVisibleText(option);
            console.log(`Dropdown option selected: ${option}`);
        } catch(error){
console.error(error)
return false
        }
    }



    
    async generateThreeDigitNumber(): Promise<any> {
        try {
            const randomNumber = Math.floor(Math.random() * 999) + 100;
            console.log("Generated 3-digit number:", randomNumber);
            return randomNumber;
        } catch(error){
console.error(error)
return false
        }
    }
}

 /*
Author: Rakesh
Date: 22 May 2025
Modified by:
Modified Date:
Purpose to modify:
*/
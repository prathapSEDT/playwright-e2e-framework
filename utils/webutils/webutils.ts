
import {Download, expect, Locator, Page} from '@playwright/test'

import configData from '/Users/vijay/Documents/playwright-e2e-framework/app-config/app-config.json'
import path from 'path'
import * as fs from 'fs/promises';



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



//Author : Shruthi
// Date   : 21 May 2025
//Modified By :
//Modified Date :
//Purpose to modify : 
//Take a screenshots 
//Saves the image in a screenshots folder with the specified filename.
//Ensures the folder is created if it doesn't exist.



async  createScreenShot(page: Page, fileName: string):Promise<boolean>{

const folderpath = path.join(__dirname, 'screenshots');
const filePath = path.join(folderpath, `${__filename}.png`); 


try{
    //Ensure that folder exists 
    await fs.mkdir(folderpath, {recursive:true});
    //Take screenshot and save
    await page.screenshot({path: filePath});
console.log(` Screenshot saved to: ${filePath}`);
    return true;
}catch(error){
    console.error('Failed to take screenshot:', error);
      return false;
}

}






//Author : Shruthi
// Date   : 21 May 2025
//Modified By :
//Modified Date :
//Purpose to modify : 
//
 //This function is a file upload by setting the input element’s value
 //to a specified file from the local file system using Playwright’s `setInputFiles()` method.
  // It handles errors using a `try/catch` block and returns a `Promise<boolean>`
 //to indicate whether the file upload succeeded.

async fileUpload(element: Locator, fileName: string): Promise<boolean>{
try{
    const filePath = path.resolve(__dirname, 'uploads', fileName);
    
// Upload the file 
await element.setInputFiles(filePath);
console.log(`File uploaded successfull:${filePath}`);
return true;
    
}catch (error){
   console.error('File upload failed:', error);
    return false;  
}


}








//Author : Shruthi
// Date   : 21 May 2025
//Modified By :
//Modified Date :
//Purpose to modify : 
//
 //This function is a file download by clicking the provided Locator
 //Uses download.saveAs() to save the file to the downloads/ folder with the specified fileName.
  // Catches and logs errors using a try/catch block.
 //Returns a Promise<boolean> so your test can conditionally react to success or failure.
async fileDownload(page: Page,element: Locator, fileName: string): Promise<boolean>{
try {
    //file download
    const [download]: [Download,void] = await Promise.all([
      page.waitForEvent('download'), // Wait for the download event
      element.click(),      // Click the download link/button
    ]);

    // Define where to save the downloaded file
    const downloadPath = path.join(__dirname, 'downloads', fileName);

    // Save the downloaded file to specified path 
    await download.saveAs(downloadPath);

    console.log(` File downloaded successfully to: ${downloadPath}`);
    return true;
  } catch (error) {
    console.error('File download failed:', error);
    return false;
  }
}









//Author : Shruthi
// Date   : 21 May 2025
//Modified By :
//Modified Date :
//Purpose to modify : 
//
 // This function checks if the input field's current value matches the provided test data.
 //It retries the check up to a fixed number of times to handle dynamic delays or slow rendering.
  // It uses a `try/catch` block to handle runtime errors and returns a `Promise<boolean>`
 //indicating whether the text was successfully verified in the input field.
 async  checkTextEntered(element: any,testData: any,textDesc: any): Promise<boolean> {
  const retryLimit = 5; // Limit the number of retries to avoid infinite loops
  let attempts = 0;

  try {
    while (attempts < retryLimit) {
      const enteredText = await element.inputValue();

      if (enteredText === testData) {
        console.log(`${textDesc}: Text "${testData}" correctly entered.`);
        return true;
        }
        attempts++;
     }

    console.error(` ${textDesc}: Text "${testData}" was not entered correctly after ${retryLimit} retries.`);
    return false;
  } catch (error) {
    console.error(` ${textDesc}: Error checking text entry:`, error);
    return false;
  }
}


    


 /*
Author: Rakesh
Date: 22 May 2025
Modified by:
Modified Date:
Purpose to modify:
*/


    /*
    Author: Manikanta Srinivas
    Date: 22 May 2025
    Modified by:
    Modified Date:
    Purpose to modify:

    @method name: getCurrentDate
    @purpose: This method can be used to find the current date  
    
    */ 

    async getCurrentDate():Promise<string>{
        try
        {
           const todaysDate = new Date();
           return todaysDate.toString();
        }
        catch (error)
        {
            console.error("error fetching current date:",error);
            throw error;
        }
    }

    /*
    Author: Manikanta Srinivas
    Date: 22 May 2025
    Modified by:
    Modified Date:
    Purpose to modify:

    @method name: getCurrentTime
    @purpose: This method can be used to find the current time  
    
    */     
    
    async getCurrentTime(): Promise<string>{
        try
        {
            const presentTime = new Date();
            return presentTime.toTimeString();
        }
        catch(error)
        {
            console.error("can't fetch the current time",error);
            throw error;
        }
    }


}
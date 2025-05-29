
import { Download, expect, Locator, Page } from '@playwright/test'
import config from '../../app-config/app-config.json'
import configData from '../../app-config/app-config.json'
import path from 'path'
import * as fs from 'fs/promises';



export default class WebLib {
    page: Page
    constructor(page: Page) {
        this.page = page

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

    async fillData(webElement: any, inputdata: string): Promise<boolean> {
        let actionStatus: boolean = false
        try {
            let element = await this.getLocator(webElement)
            await this.waitForWebElement(element)
            await element.clear()
            await element.fill(inputdata)
            actionStatus = true
        } catch (error) {
            actionStatus = false
        } return actionStatus

    }
    /*
Author: Rakesh
Date: 22 May 2025
Modified by:
Modified Date:
Purpose to modify:
*/

    async getTextFromElement(webElement: any): Promise<any> {
        try {
            let element = await this.getLocator(webElement)
            const text = await element.innerText()
            console.log("Enter the text :", text);
            return text;
        } catch (error) {
            console.error(error)
            return false
        }
    }
    async selectDropDown(webElement: any, option: string) {
        try {
            let element: Locator = await this.getLocator(webElement)
            await element.selectOption(option)
            console.log(`Dropdown option selected: ${option}`);
        } catch (error) {
            console.error(error)
            return false
        }
    }
    async generateThreeDigitNumber(): Promise<any> {
        try {
            const randomNumber = Math.floor(Math.random() * 999) + 100;
            console.log("Generated 3-digit number:", randomNumber);
            return randomNumber;
        } catch (error) {
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
    async createScreenShot(page: Page, fileName: string): Promise<boolean> {
        const folderpath = path.join(__dirname, 'screenshots');
        const filePath = path.join(folderpath, `${__filename}.png`);
        try {
            //Ensure that folder exists 
            await fs.mkdir(folderpath, { recursive: true });
            //Take screenshot and save
            await page.screenshot({ path: filePath });
            console.log(` Screenshot saved to: ${filePath}`);
            return true;
        } catch (error) {
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

    async fileUpload(webelement: any, fileName: string): Promise<boolean> {
        try {
            const filePath = path.resolve(__dirname, 'uploads', fileName);
            let element: Locator = await this.getLocator(webelement)
            // Upload the file 
            await element.setInputFiles(filePath);
            console.log(`File uploaded successfull:${filePath}`);
            return true;

        } catch (error) {
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
    async fileDownload(webElement: any, fileName: string): Promise<boolean> {
        try {
            let element: Locator = await this.getLocator(webElement)
            //file download
            const [download]: [Download, void] = await Promise.all([
                this.page.waitForEvent('download'), // Wait for the download event
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
    // This function checks if the input field's current value matches the provided test data.
    //It retries the check up to a fixed number of times to handle dynamic delays or slow rendering.
    // It uses a `try/catch` block to handle runtime errors and returns a `Promise<boolean>`
    //indicating whether the text was successfully verified in the input field.
    async checkTextEntered(webElement: any, testData: any, textDesc: any): Promise<boolean> {
        const retryLimit = 5; // Limit the number of retries to avoid infinite loops
        let attempts = 0;
        let element: Locator = await this.getLocator(webElement)
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
    Author: Manikanta Srinivas
    Date: 22 May 2025
    Modified by:
    Modified Date:
    Purpose to modify:

    @method name: getCurrentDate
    @purpose: This method can be used to find the current date  
    
    */

    async getCurrentDate(): Promise<string> {
        try {
            const todaysDate = new Date();
            return todaysDate.toString();
        }
        catch (error) {
            console.error("error fetching current date:", error);
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

    async getCurrentTime(): Promise<string> {
        try {
            const presentTime = new Date();
            return presentTime.toTimeString();
        }
        catch (error) {
            console.error("can't fetch the current time", error);
            throw error;
        }
    }


    async launchApplication() {
        try {
            let env: string = config['env']
            let appurl: string = config[env]['weburl']
            if (appurl == 'undefined') {
                throw new Error("App url can not be blank")
            }
            await this.page.goto(appurl)
            await this.page.setViewportSize({ width: 1920, height: 1080 });
        } catch (error) {
            console.error(`Failed to launch application\nError:${error}`)
        }
    }
    protected async getLocator(locatorConfig: any): Promise<Locator> {
        switch (String(locatorConfig['type']).toLowerCase()) {
            case 'xpath':
                return this.page.locator(`xpath=${locatorConfig["property"]}`);
            case 'css':
                return this.page.locator(locatorConfig["property"]);
            case 'getbyrole':
                return this.page.getByRole(locatorConfig["property"]); // property must be [role, options]
            case 'getbytext':
                return this.page.getByText(locatorConfig["property"]);
            case 'getbylabel':
                return this.page.getByLabel(locatorConfig["property"]);
            case 'getbytestid':
                return this.page.getByTestId(locatorConfig["property"]);
            default:
                throw new Error(`Unsupported locator type: ${locatorConfig["type"]}`);
        }
    }
    protected async waitForWebElement(locatorConfig: any, timeout = 10000) {
        let locator: Locator = await this.getLocator(locatorConfig)
        await locator.waitFor({ state: 'visible', timeout })
    }

    protected async clickElement(locatorConfig: any) {
        let locator: Locator = await this.getLocator(locatorConfig)
        await this.waitForWebElement(locatorConfig)
        try {
            await locator.click()
        } catch (error) {
            console.error(`Failed to click the element\nError:${error}`)
        }
    }

    protected async getPageContext(): Promise<Page> {
        return this.page
    }


}
import { test, expect } from '@playwright/test';
import WebLib from '../utils/webutils/webutils';
import Homepage from '../capabilities/homepage';

test('has title', async ({ page }) => {
  const webUtil = new WebLib(page)
  await webUtil.launchApplication()

  const homePage = new Homepage(page)
  await homePage.navigateToRegistrationPage()
});

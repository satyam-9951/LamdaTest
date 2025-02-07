const { test, expect } = require('@playwright/test');
const { connectToBrowser } = require('../utils/setup');
const { teardown } = require('../utils/teardown');
const HomePage = require('../pages/homePage');
test.setTimeout(600000);

test('Open Amazon and check url', async ({ browserName }) => 
{
  const capabilities = require('../config/capabilities');
  const capability = capabilities.find(cap => cap.browserName === browserName);

  if (!capability) {
    throw new Error(`No capability found for browser: ${browserName}`);
  }

  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();

  try {
    const homePage = new HomePage(page);
    await homePage.openUrl("https://www.amazon.in/");
    const requiredUrl=await homePage.checkUrl();
    expect(requiredUrl).toBe('https://www.amazon.in/');
    await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Url matched' } })}`);
  } catch (e) {
    await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`);
    throw e;
  } finally {
    await teardown(page, browser);
  }
});
test('Open Amazon and check logo', async ({ browserName }) => 
    {
      const capabilities = require('../config/capabilities');
      const capability = capabilities.find(cap => cap.browserName === browserName);
    
      if (!capability) {
        throw new Error(`No capability found for browser: ${browserName}`);
      }
    
      const browser = await connectToBrowser(capability);
      const page = await browser.newPage();
    
      try {
        const homePage =new HomePage(page);
        await homePage.openUrl("https://www.amazon.in/");
        const result=await homePage.checkLogo();
        expect(result).toBe(true);
        await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'logo is visible' } })}`);
      } catch (e) {
        await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`);
        throw e;
      } finally {
        await teardown(page, browser);
      }
    });
    test('Open amazon and check iphone 13 price', async ({ browserName }) => 
        {
          const capabilities = require('../config/capabilities');
          const capability = capabilities.find(cap => cap.browserName === browserName);
        
          if (!capability) {
            throw new Error(`No capability found for browser: ${browserName}`);
          }
        
          const browser = await connectToBrowser(capability);
          const page = await browser.newPage();
        
          try {
            const homePage =new HomePage(page);
            await homePage.openUrl("https://www.amazon.in/");
            await homePage.searchInput("iphone 13");
            await homePage.clickSearchBtn();
            const price=await homePage.getPhonePrice();
            expect(price).toBe("43,999");
            await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'price matched' } })}`);
          } catch (e) {
            await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: e.stack } })}`);
            throw e;
          } finally {
            await teardown(page, browser);
          }
        });
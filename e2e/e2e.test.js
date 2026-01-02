import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000);

describe('Popover widget', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true, // для CI — true; можно false при отладке
    });

    page = await browser.newPage();
  });

  it('widget should add popover element', async () => {
    await page.goto(baseUrl);

    const button = await page.$('.popover-toggle');
    expect(button).toBeTruthy();

    await button.click();

    const popover = await page.$('.popover');
    expect(popover).toBeTruthy();
  });

  it('widget should remove popover element', async () => {
    await page.goto(baseUrl);

    const button = await page.$('.popover-toggle');
    expect(button).toBeTruthy();

    await button.click();
    await page.waitForSelector('.popover');

    await button.click();
    await page.waitForFunction(() => !document.querySelector('.popover'));
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});

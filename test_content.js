import { spawn } from 'child_process';
import puppeteer from 'puppeteer';

(async () => {
  const vite = spawn('npx', ['vite', '--port', '5176'], { stdio: 'pipe' });
  await new Promise(r => setTimeout(r, 3000));

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5176', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  const content = await page.content();
  console.log(content.substring(0, 1500));
  
  await browser.close();
  vite.kill();
  process.exit(0);
})();

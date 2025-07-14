import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set default viewport size
    await page.setViewportSize({ width: 1280, height: 2000 });
  });

  test('columns visual test at mobile viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 320, height: 568 });
    
    // Navigate to the block variation
    await page.goto('/tools/sidekick/library.html?plugin=blocks&path=/tools/sidekick/template/columns&index=0&vtest=true');
    
    // Wait for the library component to load
    await page.waitForSelector('sidekick-library', { timeout: 30000 });
    
    // Wait for the iframe to load and switch to its context
    const iframe = await page.waitForSelector('sidekick-library >> sp-theme >> plugin-renderer >> .view block-renderer >> iframe', { timeout: 30000 });
    const frame = await iframe.contentFrame();
    if (!frame) throw new Error('Could not get iframe content frame');
    
    // Wait for the block to be fully rendered
    const block = await frame.waitForSelector('.columns', { timeout: 30000, state: 'visible' });
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(1000);

    await block.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, block);
    
    // Get the bounding box of the block
    const box = await block.boundingBox();
    if (!box) throw new Error('Could not get bounding box for columns');

    await page.setViewportSize({ 
      width: 320,
      height: Math.round(box.height + box.y),
    });

    // Take a screenshot of only the block area
    const screenshotName = 'columns-0-mobile.png';
    const screenshot = await page.screenshot({
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.1,
      animations: 'disabled',
    });

    expect(screenshot).toMatchSnapshot(screenshotName);
  });
  test('columns visual test at tablet viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Navigate to the block variation
    await page.goto('/tools/sidekick/library.html?plugin=blocks&path=/tools/sidekick/template/columns&index=0&vtest=true');
    
    // Wait for the library component to load
    await page.waitForSelector('sidekick-library', { timeout: 30000 });
    
    // Wait for the iframe to load and switch to its context
    const iframe = await page.waitForSelector('sidekick-library >> sp-theme >> plugin-renderer >> .view block-renderer >> iframe', { timeout: 30000 });
    const frame = await iframe.contentFrame();
    if (!frame) throw new Error('Could not get iframe content frame');
    
    // Wait for the block to be fully rendered
    const block = await frame.waitForSelector('.columns', { timeout: 30000, state: 'visible' });
    
    // Small delay to ensure layout is stable after breakpoint transition
    await page.waitForTimeout(1000);

    await block.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, block);
    
    // Get the bounding box of the block
    const box = await block.boundingBox();
    if (!box) throw new Error('Could not get bounding box for columns');

    await page.setViewportSize({ 
      width: 768,
      height: Math.round(box.height + box.y),
    });

    // Take a screenshot of only the block area
    const screenshotName = 'columns-0-tablet.png';
    const screenshot = await page.screenshot({
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.1,
      animations: 'disabled',
    });

    expect(screenshot).toMatchSnapshot(screenshotName);
  });
  test('columns visual test at desktop viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1024, height: 768 });
    
    // Navigate to the block variation
    await page.goto('/tools/sidekick/library.html?plugin=blocks&path=/tools/sidekick/template/columns&index=0&vtest=true');
    
    // Wait for the library component to load
    await page.waitForSelector('sidekick-library', { timeout: 30000 });
    
    // Wait for the iframe to load and switch to its context
    const iframe = await page.waitForSelector('sidekick-library >> sp-theme >> plugin-renderer >> .view block-renderer >> iframe', { timeout: 30000 });
    const frame = await iframe.contentFrame();
    if (!frame) throw new Error('Could not get iframe content frame');
    
    // Wait for the block to be fully rendered
    const block = await frame.waitForSelector('.columns', { timeout: 30000, state: 'visible' });
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(1000);

    await block.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, block);
    
    // Get the bounding box of the block
    const box = await block.boundingBox();
    if (!box) throw new Error('Could not get bounding box for columns');

    await page.setViewportSize({ 
      width: 1024,
      height: Math.round(box.height + box.y),
    });

    // Take a screenshot of only the block area
    const screenshotName = 'columns-0-desktop.png';
    const screenshot = await page.screenshot({
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.1,
      animations: 'disabled',
    });

    expect(screenshot).toMatchSnapshot(screenshotName);
  });
  test('columns visual test at large viewport', async ({ page }) => {
    // Set viewport size
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Navigate to the block variation
    await page.goto('/tools/sidekick/library.html?plugin=blocks&path=/tools/sidekick/template/columns&index=0&vtest=true');
    
    // Wait for the library component to load
    await page.waitForSelector('sidekick-library', { timeout: 30000 });
    
    // Wait for the iframe to load and switch to its context
    const iframe = await page.waitForSelector('sidekick-library >> sp-theme >> plugin-renderer >> .view block-renderer >> iframe', { timeout: 30000 });
    const frame = await iframe.contentFrame();
    if (!frame) throw new Error('Could not get iframe content frame');
    
    // Wait for the block to be fully rendered
    const block = await frame.waitForSelector('.columns', { timeout: 30000, state: 'visible' });
    
    // Small delay to ensure layout is stable
    await page.waitForTimeout(1000);

    await block.scrollIntoViewIfNeeded();
    await page.evaluate(el => {
      el.style.overflow = 'visible';
      el.style.maxHeight = 'none';
    }, block);
    
    // Get the bounding box of the block
    const box = await block.boundingBox();
    if (!box) throw new Error('Could not get bounding box for columns');

    await page.setViewportSize({ 
      width: 1440,
      height: Math.round(box.height + box.y),
    });

    // Take a screenshot of only the block area
    const screenshotName = 'columns-0-large.png';
    const screenshot = await page.screenshot({
      clip: box,
      timeout: 30000,
      maxDiffPixels: 500,
      threshold: 0.1,
      animations: 'disabled',
    });

    expect(screenshot).toMatchSnapshot(screenshotName);
  });
});
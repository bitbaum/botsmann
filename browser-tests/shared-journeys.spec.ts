import { expect, test } from '@playwright/test';

test('published shared article is readable without JavaScript', async ({
  browser,
  baseURL,
  viewport,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const page = await context.newPage();
  const response = await page.goto(`${baseURL}/blog/welcome-post`);
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole('heading', { name: 'Welcome to the Botsmann Blog', level: 1 }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
  await context.close();
});

test('shared article navigation works at the actual viewport', async ({ page }) => {
  await page.route('https://giscus.app/**', (route) => route.fulfill({ status: 204 }));
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.stack ?? error.message));
  await page.goto('/blog');
  await page.locator('a[href="/blog/future-focused-investment-strategy"]').first().click();
  await expect(
    page.getByRole('heading', {
      name: 'The Future-Focused Investment Strategy: Balancing Vision and Volatility',
      level: 1,
    }),
  ).toBeVisible();
  const toc = page.locator('a[href="#the-foundation-commodities-as-the-bedrock"]');
  await expect(toc.first()).toBeVisible();
  await toc.first().click();
  await expect(page).toHaveURL(/#the-foundation-commodities-as-the-bedrock$/);
  await expect(
    page.getByRole('heading', { name: 'The Foundation: Commodities as the Bedrock' }),
  ).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test('unconfigured contact delivery fails visibly and retains the message', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name', { exact: true }).fill('Browser fixture');
  await page.getByLabel('Email', { exact: true }).fill('fixture@example.invalid');
  await page
    .getByLabel('Message', { exact: true })
    .fill('Do not send: synthetic local delivery check');
  const response = page.waitForResponse((response) => response.url().endsWith('/api/contact'));
  await page.getByRole('button', { name: 'Send Message', exact: true }).click();
  expect((await response).status()).toBe(503);
  await expect(page.locator('form').getByRole('alert')).toBeVisible();
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue(
    'Do not send: synthetic local delivery check',
  );
  await expect(page.getByRole('heading', { name: 'Thank you!', exact: true })).toHaveCount(0);
});

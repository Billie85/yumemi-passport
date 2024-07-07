import { test, expect } from '@playwright/test';

test('北海道 年少人口のグラフ作成', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: '北海道' }).getByLabel('').check();
  await page.getByRole('combobox').selectOption('1');
  await page.waitForTimeout(3000);
});

test('青森 老年人口のグラフ作成', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: '青森県' }).getByLabel('').check();
  await page.getByRole('combobox').selectOption('3');
  await page.waitForTimeout(3000);
});

test('埼玉 生産年齢人口', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: '埼玉県' }).getByLabel('').check();
  await page.getByRole('combobox').selectOption('2');
  await page.waitForTimeout(3000);

});

test('山口 総人口', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: '山口県' }).getByLabel('').check();
  await page.waitForTimeout(3000);
});

test('沖縄 年少人口', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('li').filter({ hasText: '沖縄県' }).getByLabel('').check();
  await page.getByRole('combobox').selectOption('1');
  await page.waitForTimeout(3000);
});
import { expect, test } from "playwright/test";

type RouteCheck = {
  path: string;
  key: string;
  heading: RegExp;
};

const devices = [
  { name: "mobile", viewport: { width: 390, height: 844 } },
  { name: "tablet", viewport: { width: 834, height: 1194 } },
  { name: "desktop", viewport: { width: 1440, height: 900 } },
] as const;

const routes: RouteCheck[] = [
  { path: "/", key: "home", heading: /DevOps|Cloud Engineer/i },
  { path: "/#/about", key: "about", heading: /About/i },
  { path: "/#/experience", key: "experience", heading: /Experience/i },
  { path: "/#/projects", key: "projects", heading: /Project/i },
  { path: "/#/skills", key: "skills", heading: /Skill/i },
  { path: "/#/education", key: "education", heading: /Education/i },
  { path: "/#/certifications", key: "certifications", heading: /Certification/i },
  { path: "/#/contact", key: "contact", heading: /Connect|Contact/i },
];

for (const device of devices) {
  test.describe(`Responsive UI - ${device.name}`, () => {
    for (const route of routes) {
      test(`${route.key} should render cleanly on ${device.name}`, async ({ page }) => {
        await page.setViewportSize(device.viewport);
        await page.goto(route.path, { waitUntil: "networkidle" });

        await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
        await expect(page.locator("main#main-content")).toBeVisible();
        await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);

        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth - window.innerWidth > 2;
        });
        expect(hasHorizontalOverflow).toBeFalsy();

        const screenshotPath = `test-results/ui-screenshots/${device.name}/${route.key}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: device.name !== "mobile" });
      });
    }
  });
}




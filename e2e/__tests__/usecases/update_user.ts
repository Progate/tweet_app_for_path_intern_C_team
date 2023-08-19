import fs from "node:fs";
import {URL} from "url";
import {ElementHandle} from "puppeteer";

describe("Update user", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "master@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  describe("submit success", () => {
    beforeEach(async () => {
      await page.goto(`${TARGET_PAGE_URL}/users/2/edit`);
      await page.$eval(
        "[data-test=input-name]",
        el => ((el as HTMLInputElement).value = "update")
      );
      await page.$eval(
        "[data-test=input-email]",
        el => ((el as HTMLInputElement).value = "update@example.com")
      );
    });
    test("display updated user show page and dialog message [kwSS1orxFfQCzf3If3uhZ]", async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);

      const name = await page.$eval("[data-test=user-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const email = await page.$eval("[data-test=user-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(name).toBe("update");
      expect(email).toBe("update@example.com");
      expect(message).toBe("Your account has been updated successfully");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
    test("does not change user image when image file is empty [dv_xA1JUd25jcjyw37KGS]", async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);

      const href = await page.$eval(
        "[data-test=user-image]",
        el => (el as HTMLImageElement).src
      );
      expect(href).toBe(`${TARGET_PAGE_URL}/image/users/2.jpg`);
    });
    test("changes user image when image file is selected [qF2FAE3HCIulZYARTtMkb]", async () => {
      const userImagePath = "e2e/__tests__/mock/img/test_image.jpg";
      const imageInput = (await page.$(
        "[data-test=input-image]"
      )) as ElementHandle<HTMLInputElement>;
      await imageInput?.uploadFile(userImagePath);

      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);

      const href = await page.$eval(
        "[data-test=user-image]",
        el => (el as HTMLImageElement).src
      );
      expect(href).not.toBe(`${TARGET_PAGE_URL}/image/users/2.jpg`);
      expect(href.startsWith(`${TARGET_PAGE_URL}/image/users/`)).toBeTruthy();

      const url = new URL(href);
      const fileName = url.pathname.replace("/image/users/", "");
      const filePath = `public/image/users/${fileName}`;
      expect(
        fs.readFileSync(userImagePath).equals(fs.readFileSync(filePath))
      ).toBeTruthy();
      fs.unlinkSync(filePath);
    });
  });
  describe("submit failed", () => {
    test("display error messages [qIv6roYNbaZUtmsa7SY01]", async () => {
      await page.goto(`${TARGET_PAGE_URL}/users/2/edit`);
      await page.$eval(
        "[data-test=input-name]",
        el => ((el as HTMLInputElement).value = "")
      );
      await page.$eval(
        "[data-test=input-email]",
        el => ((el as HTMLInputElement).value = "")
      );
      await Promise.all([
        page.waitForSelector("[data-test=error-name]"),
        page.click("[data-test=submit]"),
      ]);
      const nameError = await page.$eval("[data-test=error-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const emailError = await page.$eval("[data-test=error-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(nameError).toBe("Name can't be blank");
      expect(emailError).toBe("Email can't be blank");
    });
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

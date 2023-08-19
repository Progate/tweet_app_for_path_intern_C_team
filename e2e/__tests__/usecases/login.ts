describe("Login", () => {
  describe("submit success", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
    });
    test("display post index page and dialog message [zsq4Sv5XWq5PwTRMmV4hW]", async () => {
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(message).toBe("You have logged in successfully");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });
  describe("submit failed", () => {
    beforeEach(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
    });
    test("display empty error messages [zLWa1RyHZR8DH0ZYyNXwH]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=error-email]"),
        page.click("[data-test=submit]"),
      ]);
      const emailError = await page.$eval("[data-test=error-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const passwordError = await page.$eval("[data-test=error-password", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(emailError).toBe("Email can't be blank");
      expect(passwordError).toBe("Password can't be blank");
    });

    test("display incorrect error message when email is wrong [7rV-nUPAOZGknKeeoqd8k]", async () => {
      await page.type("[data-test=input-email]", "incorrect@test.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForSelector("[data-test=error-custom]"),
        page.click("[data-test=submit]"),
      ]);
      const incorrectError = await page.$eval("[data-test=error-custom]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(incorrectError).toBe("Invalid email/password combination");
    });

    test("display incorrect error message when password is wrong [q6ver29Xj6aTIWd55b_Bl]", async () => {
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "incorrect");
      await Promise.all([
        page.waitForSelector("[data-test=error-custom]"),
        page.click("[data-test=submit]"),
      ]);
      const incorrectError = await page.$eval("[data-test=error-custom]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(incorrectError).toBe("Invalid email/password combination");
    });
  });
});

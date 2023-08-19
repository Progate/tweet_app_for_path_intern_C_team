describe("Signup", () => {
  describe("submit success", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/signup`);
      await page.type("[data-test=input-name]", "Ken the Ninja");
      await page.type("[data-test=input-email]", "test@example.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
    });
    test("display created user show page and dialog message [9IZKM2fsK49afkor00ib_]", async () => {
      const name = await page.$eval("[data-test=user-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const email = await page.$eval("[data-test=user-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(message).toBe("You have signed up successfully");
      expect(name).toBe("Ken the Ninja");
      expect(email).toBe("test@example.com");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
    test("sign in with the password user created [9IZKM2fsK49afkor00ib_]", async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=header-link-logout]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "test@example.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
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
      await page.goto(`${TARGET_PAGE_URL}/signup`);
    });
    test("display empty error messages [SNcuiqwSmyuSz-DsFzzSV]", async () => {
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
      const passwordError = await page.$eval("[data-test=error-password", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(nameError).toBe("Name can't be blank");
      expect(emailError).toBe("Email can't be blank");
      expect(passwordError).toBe("Password can't be blank");
    });
    test("display email already exists error messages [Mf6g_VV0zyOkcn0jY6wR-]", async () => {
      await page.type("[data-test=input-name]", "Ken the Ninja");
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForSelector("[data-test=error-email]"),
        page.click("[data-test=submit]"),
      ]);
      const emailError = await page.$eval("[data-test=error-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(emailError).toBe("Email has already been taken");
    });
  });
});

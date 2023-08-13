describe("Post edit page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/posts/1/edit`);
    });
    test("set form elements [QxVsMj44Kp55FxSxcIrfl]", async () => {
      const action = await page.$eval(
        "[data-test=form]",
        el => (el as HTMLFormElement).action
      );
      const content = await page.$eval(
        "[data-test=textarea-content]",
        el => (el as HTMLInputElement).value
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(new URL(action).pathname).toBe("/posts/1");
      expect(content).toBe("Looking for a good book to read.");
      expect(value).toBe("Save");
    });
    test("display no authorization error [u_wyAolNGjYTZu88IGFbL]", async () => {
      await page.goto(`${TARGET_PAGE_URL}/posts/2/edit`);
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(message).toBe("Unauthorized access");
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
  describe("before sign in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/posts/1/edit`);
    });
    test("display sign in required error [w65LXlQ0bzwrMMJ4t888d]", async () => {
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/login`);
      expect(message).toBe("You must be logged in");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
});

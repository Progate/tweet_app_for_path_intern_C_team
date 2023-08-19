describe("Post update", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  beforeEach(async () => {
    await page.goto(`${TARGET_PAGE_URL}/posts/7/edit`);
  });
  describe("submit success", () => {
    test("display post index page and dialog message [JY9O5qhu2x7FlZ116hRrZ]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "update content")
      );
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      const content = await page.$eval(
        "[data-test=post-7] [data-test=post-item-content]",
        el => (el as HTMLElement).innerText.trim()
      );
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(message).toBe("Post successfully edited");
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(content).toBe("update content");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
  describe("submit failed", () => {
    test("display empty error message [XYDQwwwtuOhKIlZ0Po_bT]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "")
      );
      await Promise.all([
        page.waitForSelector("[data-test=error-content]"),
        page.click("[data-test=submit]"),
      ]);
      const message = await page.$eval("[data-test=error-content]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(message).toBe("Content can't be blank");
    });
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

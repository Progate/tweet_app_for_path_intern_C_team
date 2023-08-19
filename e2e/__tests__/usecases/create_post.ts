describe("Post create", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "8@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  beforeEach(async () => {
    await page.goto(`${TARGET_PAGE_URL}/posts/new`);
  });
  describe("submit success", () => {
    test("display post index page and dialog message [um_uej6dYy4jNAOecEUoc]", async () => {
      await page.$eval(
        "[data-test=textarea-content]",
        el => ((el as HTMLTextAreaElement).value = "test content")
      );
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      const content = await page.$eval("[data-test=posts-container]", el => {
        return (
          el.firstElementChild?.querySelector(
            "[data-test=post-item-content]"
          ) as HTMLElement
        ).innerText.trim();
      });
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
      expect(message).toBe("Post successfully created");
      expect(content).toBe("test content");
    });
  });
  describe("submit failed", () => {
    test("display empty error message [ug76mtRMLDv30YJ_HdH87]", async () => {
      await Promise.all([
        page.waitForSelector("[data-test=error-content]"),
        page.click("[data-test=submit]"),
      ]);
      const content = await page.$eval("[data-test=error-content]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(content).toBe("Content can't be blank");
    });
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

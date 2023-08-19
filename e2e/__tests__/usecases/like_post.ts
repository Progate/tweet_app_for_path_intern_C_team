describe("Like post", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  test("the icon turns red and the count increases by one [InEnhMvZIOdGbyS_E3oNh]", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=favorite-icon]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=favorite-icon]"),
    ]);
    const action = await page.$eval(
      "[data-test=form-like]",
      el => (el as HTMLFormElement).action
    );
    const icon = await page.$eval("[data-test=favorite-icon]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const count = await page.$eval("[data-test=like-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(new URL(action).pathname).toBe("/posts/3/likes");
    expect(icon).toBe("favorite");
    expect(count).toBe("4");
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

describe("Unlike post", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  test("the icon will turn white and the count will decrease by one [oqezHyX4muwkoVjyAaXuf]", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=favorite-icon]"),
      page.goto(`${TARGET_PAGE_URL}/posts/5`),
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
    expect(new URL(action).pathname).toBe("/posts/5/likes");
    expect(icon).toBe("favorite_border");
    expect(count).toBe("2");
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

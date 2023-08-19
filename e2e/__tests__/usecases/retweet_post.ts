describe("Retweet post", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  test("the count increases by one", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/1`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
    const count = await page.$eval("[data-test=retweet-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(count).toBe("1");
  });
  test("the count decreases by one when unretweet", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
    let count = await page.$eval("[data-test=retweet-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(count).toBe("1");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
    count = await page.$eval("[data-test=retweet-count]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(count).toBe("0");
  });
  test("display retweet post on the top in posts index page", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
    await Promise.all([
      page.waitForSelector("[data-test=posts-container]"),
      page.goto(`${TARGET_PAGE_URL}/posts`),
    ]);
    const newestContent = await page.$eval(
      "[data-test=posts-container]",
      el => {
        return (
          el.firstElementChild?.querySelector(
            "[data-test=post-item-content]"
          ) as HTMLElement
        ).innerText.trim();
      }
    );
    const postLabel = await page.$eval("[data-test=posts-container]", el => {
      return (
        el.firstElementChild?.querySelector(
          "[data-test=post-label]"
        ) as HTMLElement
      ).innerText.trim();
    });
    expect(newestContent).toBe(
      "Master Wooly taught me how to use Git! Now I can teach my little brother Ben."
    );
    expect(postLabel).toBe("Ken the Ninja Retweeted");
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
  });
  test("display retweet post on the top in user show page", async () => {
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
    await Promise.all([
      page.waitForSelector("[data-test=posts-container]"),
      page.goto(`${TARGET_PAGE_URL}/users/1`),
    ]);
    const newestContent = await page.$eval(
      "[data-test=posts-container]",
      el => {
        return (
          el.firstElementChild?.querySelector(
            "[data-test=post-item-content]"
          ) as HTMLElement
        ).innerText.trim();
      }
    );
    const postLabel = await page.$eval("[data-test=posts-container]", el => {
      return (
        el.firstElementChild?.querySelector(
          "[data-test=post-label]"
        ) as HTMLElement
      ).innerText.trim();
    });
    expect(newestContent).toBe(
      "Master Wooly taught me how to use Git! Now I can teach my little brother Ben."
    );
    expect(postLabel).toBe("Ken the Ninja Retweeted");
    await Promise.all([
      page.waitForSelector("[data-test=submit-retweet]"),
      page.goto(`${TARGET_PAGE_URL}/posts/3`),
    ]);
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit-retweet]"),
    ]);
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

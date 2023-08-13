describe("before sign in header", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
  });
  test("display header menu [NksqkQrHAzxeJt32ngFyW]", async () => {
    const logo = await page.$eval("[data-test=header-logo]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const about = await page.$eval("[data-test=header-link-about]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const signup = await page.$eval("[data-test=header-link-signup]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const login = await page.$eval("[data-test=header-link-login]", el =>
      (el as HTMLElement).innerText.trim()
    );
    expect(logo).toBe("TweetApp");
    expect(about).toBe("About");
    expect(signup).toBe("Sign up");
    expect(login).toBe("Log in");
  });
});

describe("after sign in header", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/login`);
    await page.type("[data-test=input-email]", "ninja@progate.com");
    await page.type("[data-test=input-password]", "password");
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=submit]"),
    ]);
  });
  test("display header menu [guVRfeCs8-A3GsfXYRC7p]", async () => {
    const logo = await page.$eval("[data-test=header-logo]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const href = await page.$eval(
      "[data-test=header-logo]",
      el => (el as HTMLAnchorElement).href
    );
    const myPage = await page.$eval("[data-test=header-link-mypage]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const postIndex = await page.$eval(
      "[data-test=header-link-posts-index]",
      el => (el as HTMLElement).innerText.trim()
    );
    const postNew = await page.$eval("[data-test=header-link-posts-new]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const userIndex = await page.$eval(
      "[data-test=header-link-users-index]",
      el => (el as HTMLElement).innerText.trim()
    );
    const logout = await page.$eval(
      "[data-test=header-link-logout]",
      el => (el as HTMLInputElement).value
    );
    expect(logo).toBe("TweetApp");
    expect(href).toBe(`${TARGET_PAGE_URL}/posts`);
    expect(myPage).toBe("Ken the Ninja");
    expect(postIndex).toBe("Posts");
    expect(postNew).toBe("New post");
    expect(userIndex).toBe("Users");
    expect(logout).toBe("Log out");
  });
  afterAll(async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("[data-test=header-link-logout]"),
    ]);
  });
});

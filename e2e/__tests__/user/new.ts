describe("User new page", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/signup`);
  });
  test("render form heading [FR_egKXSRGHlxE-VFYqKf]", async () => {
    const heading = await page.$eval("[data-test=form-heading]", el =>
      (el as HTMLFormElement).innerText.trim()
    );
    expect(heading).toBe("Sign up");
  });
  test("set form elements [S0sS5UVuqzdb0QsROcViQ]", async () => {
    const action = await page.$eval(
      "[data-test=form]",
      el => (el as HTMLFormElement).action
    );
    const name = await page.$eval(
      "[data-test=input-name]",
      el => (el as HTMLInputElement).name
    );
    const email = await page.$eval(
      "[data-test=input-email]",
      el => (el as HTMLInputElement).name
    );
    const password = await page.$eval(
      "[data-test=input-password]",
      el => (el as HTMLInputElement).name
    );
    const value = await page.$eval(
      "[data-test=submit]",
      el => (el as HTMLInputElement).value
    );
    expect(new URL(action).pathname).toBe("/users");
    expect(name).toBe("name");
    expect(email).toBe("email");
    expect(password).toBe("password");
    expect(value).toBe("Sign up");
  });
  describe("already signed in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/signup`);
    });
    test("display posts index page and already signed in message [2ba4jmMeeDyfd3mvO5UnO]", async () => {
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(message).toBe("You are already logged in");
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/posts`);
    });
    afterAll(async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=header-link-logout]"),
      ]);
    });
  });
});

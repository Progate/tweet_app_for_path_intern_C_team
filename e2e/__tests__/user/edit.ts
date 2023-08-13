describe("User edit page", () => {
  describe("sign in with correct user", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "ninja@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/users/1/edit`);
    });
    test("set form values [j09d7KZm4iIOL7N6BAv6_]", async () => {
      const action = await page.$eval(
        "[data-test=form]",
        el => (el as HTMLFormElement).action
      );
      const name = await page.$eval(
        "[data-test=input-name]",
        el => (el as HTMLInputElement).value
      );
      const email = await page.$eval(
        "[data-test=input-email]",
        el => (el as HTMLInputElement).value
      );
      const value = await page.$eval(
        "[data-test=submit]",
        el => (el as HTMLInputElement).value
      );
      expect(new URL(action).pathname).toBe("/users/1");
      expect(name).toBe("Ken the Ninja");
      expect(email).toBe("ninja@progate.com");
      expect(value).toBe("Save");
    });
    test("display image file input [jdrvS18jqzJJ5RcsFHKMQ]", async () => {
      const imageInputType = await page.$eval(
        "[data-test=input-image]",
        el => (el as HTMLInputElement).type
      );
      expect(imageInputType).toBe("file");
    });
    test("display no authorization error [opLjiQLEUJHJs471IpZjw]", async () => {
      await page.goto(`${TARGET_PAGE_URL}/users/2/edit`);
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
      await page.goto(`${TARGET_PAGE_URL}/users/1/edit`);
    });
    test("display sign in required error [fQRz9xthPhsNUMqm24Wcs]", async () => {
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

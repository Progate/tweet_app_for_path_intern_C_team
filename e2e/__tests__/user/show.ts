describe("User show page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "6@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/users/6`);
    });
    test("display user info [izadjY1N8lWT_c7ynF_tY]", async () => {
      const name = await page.$eval("[data-test=user-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const email = await page.$eval("[data-test=user-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(name).toBe("for user show");
      expect(email).toBe("6@progate.com");
    });
    test("display user posts list in order of newest to oldest [3D4kA8vORvx9dCbZL22Ja]", async () => {
      const oldestContent = await page.$eval(
        "[data-test=posts-container]",
        el => {
          return (
            el.lastElementChild?.querySelector(
              "[data-test=post-item-content]"
            ) as HTMLElement
          ).innerText.trim();
        }
      );
      const secondOldestContent = await page.$eval(
        "[data-test=posts-container]",
        el => {
          return (
            el.lastElementChild?.previousElementSibling?.querySelector(
              "[data-test=post-item-content]"
            ) as HTMLElement
          ).innerText.trim();
        }
      );

      expect(oldestContent).toBe("user show oldest post");
      expect(secondOldestContent).toBe("user show second oldest post");
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
      await page.goto(`${TARGET_PAGE_URL}/users/1`);
    });
    test("display sign in required error [zgd74V0MRfSjR8PrNINrH]", async () => {
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

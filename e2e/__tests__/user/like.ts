describe("User liked posts", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "7@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await page.goto(`${TARGET_PAGE_URL}/users/7/likes`);
    });
    test("display user info [_mZ6DtV28SjITf-9mow6_]", async () => {
      const name = await page.$eval("[data-test=user-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const email = await page.$eval("[data-test=user-email]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(name).toBe("for user like");
      expect(email).toBe("7@progate.com");
    });
    test("display user liked posts list in order of newest to oldest [zR6Zzn7YNE80A_8p0N7Qi]", async () => {
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
      expect(oldestContent).toBe("user like oldest post");
      expect(secondOldestContent).toBe("user like second oldest post");
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
      await page.goto(`${TARGET_PAGE_URL}/users/1/likes`);
    });
    test("display sign in page [H154AFoL8paL1klPsRpsz]", async () => {
      expect(page.url()).toBe(`${TARGET_PAGE_URL}/login`);
    });
    test("display sign in required error message [1JIifW8Y5KOorHnfelatc]", async () => {
      const message = await page.$eval("[data-test=dialog]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(message).toBe("You must be logged in");
      await page.reload();
      expect(await page.$("[data-test=dialog]")).toBeNull();
    });
  });
});

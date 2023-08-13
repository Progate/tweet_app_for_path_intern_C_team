describe("Post show page", () => {
  describe("after sign in", () => {
    beforeAll(async () => {
      await page.goto(`${TARGET_PAGE_URL}/login`);
      await page.type("[data-test=input-email]", "9@progate.com");
      await page.type("[data-test=input-password]", "password");
      await Promise.all([
        page.waitForNavigation(),
        page.click("[data-test=submit]"),
      ]);
      await Promise.all([
        page.waitForSelector("[data-test=submit-like]"),
        page.goto(`${TARGET_PAGE_URL}/posts/14`),
      ]);
    });
    test("retweet button is displayed", async () => {
      expect(await page.$("[data-test=submit-retweet]")).not.toBeNull();
      expect(await page.$("[data-test=retweet-count]")).not.toBeNull();
    });
    test("display post info [GUUuuP7QHN8O2VpecYkij]", async () => {
      const name = await page.$eval("[data-test=user-name]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const content = await page.$eval("[data-test=post-content]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const time = await page.$eval("[data-test=post-time]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const userImage = await page.$eval(
        "[data-test=user-image]",
        el => (el as HTMLImageElement).src
      );
      expect(name).toBe("for post show");
      expect(content).toBe("show post");
      expect(time).toBe("2021/06/01 02:32");
      expect(userImage).toBe(`${TARGET_PAGE_URL}/image/users/default_user.jpg`);
      expect(await page.$("[data-test=post-image]")).toBeNull();
    });
    test("display post's like info [lnfUMRoEWSSmTvq4yzrnf]", async () => {
      const likeAction = await page.$eval(
        "[data-test=form-like]",
        el => (el as HTMLFormElement).action
      );
      const unLikedicon = await page.$eval("[data-test=favorite-icon]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const likeCount = await page.$eval("[data-test=like-count]", el =>
        (el as HTMLElement).innerText.trim()
      );
      const unLikediconStyleFontFamily = await page.$eval(
        "[data-test=favorite-icon]",
        el => window.getComputedStyle(el).getPropertyValue("font-family")
      );
      expect(new URL(likeAction).pathname).toBe("/posts/14/likes");
      expect(unLikedicon).toBe("favorite_border");
      expect(unLikediconStyleFontFamily).toBe('"Material Icons"');
      expect(likeCount).toBe("0");
      await Promise.all([
        page.waitForSelector("[data-test=submit-like]"),
        page.goto(`${TARGET_PAGE_URL}/posts/15`),
      ]);
      const unLikeAction = await page.$eval(
        "[data-test=form-like]",
        el => (el as HTMLFormElement).action
      );
      const likedIcon = await page.$eval("[data-test=favorite-icon]", el =>
        (el as HTMLElement).innerText.trim()
      );
      expect(new URL(unLikeAction).pathname).toBe("/posts/15/likes");
      expect(likedIcon).toBe("favorite");
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
      await page.goto(`${TARGET_PAGE_URL}/posts/1`);
    });
    test("display sign in required error [ZANEuqr6wSZravaSbBnTI]", async () => {
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

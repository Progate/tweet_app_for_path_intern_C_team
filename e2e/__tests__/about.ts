describe("About page", () => {
  beforeAll(async () => {
    await page.goto(`${TARGET_PAGE_URL}/about`);
  });

  test("display heading and paragraph and image [U25NRLdrslzRdm5ARyn3X]", async () => {
    const heading = await page.$eval("[data-test=heading]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const paragraph = await page.$eval("[data-test=paragraph]", el =>
      (el as HTMLElement).innerText.trim()
    );
    const src = await page.$eval(
      "[data-test=image]",
      el => (el as HTMLImageElement).src
    );
    expect(heading).toBe("About TweetApp");
    expect(paragraph).toBe(
      'TweetApp is a social networking service. Users can post and interact with short messages called "tweets".'
    );
    expect(src).toBe(`${TARGET_PAGE_URL}/image/tweets.png`);
  });
});

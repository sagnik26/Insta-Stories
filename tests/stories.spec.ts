import { test, expect } from "@playwright/test";

test.describe("Instagram Stories Clone", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // check for header
  test("should display header correctly", async ({ page }) => {
    const header = page.locator("[data-testid='header']");
    await expect(header).toBeVisible();
    await expect(header).toContainText("Instagram");
  });

  test("should display story list", async ({ page }) => {
    const storyList = page.locator("[data-testid='storyListContainer']");

    await expect(storyList).toBeVisible({ timeout: 5000 });
  });

  // check for story viewer
  test("should open story viewer when story is clicked", async ({ page }) => {
    await page.waitForSelector("[data-testid^='storyThumbnail-']", {
      state: "visible",
      timeout: 5000,
    });

    await page.locator("[data-testid^='storyThumbnail-']").first().click();

    const storyViewer = page.locator("[data-testid='storyViewer']");
    await expect(storyViewer).toBeVisible();

    await page.locator("[data-testid='closeButton']").click();

    await expect(storyViewer).not.toBeVisible();
  });

  // check for close button
  test("should close story viewer when clicking close button", async ({
    page,
  }) => {
    await page.waitForSelector("[data-testid^='storyThumbnail-']", {
      state: "visible",
      timeout: 5000,
    });
    await page.locator("[data-testid^='storyThumbnail-']").first().click();

    const storyViewer = page.locator("[data-testid='storyViewer']");
    await expect(storyViewer).toBeVisible();

    await page.locator("[data-testid='closeButton']").click();

    await expect(storyViewer).not.toBeVisible();
  });

  // check for navigation on right side click of any story
  test("should navigate to next story when clicking right side", async ({
    page,
  }) => {
    await page.waitForSelector("[data-testid^='storyThumbnail-']", {
      state: "visible",
      timeout: 5000,
    });

    await page.locator("[data-testid^='storyThumbnail-']").first().click();

    const initialUsername = await page
      .locator("[data-testid='storyUsername']")
      .textContent();

    const storyContent = page.locator("[data-testid='storyContent']");
    const boundingBox = await storyContent.boundingBox();

    if (boundingBox) {
      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.75,
        boundingBox.y + boundingBox.height / 2
      );

      await page.waitForTimeout(500);

      const newUsername = await page
        .locator("[data-testid='storyUsername']")
        .textContent();
      expect(newUsername).not.toEqual(initialUsername);
    }

    await page.locator("[data-testid='closeButton']").click();
  });

  // check for navigation on left side click of any story
  test("should navigate to previous story when clicking left side", async ({
    page,
  }) => {
    await page.waitForSelector("[data-testid^='storyThumbnail-']", {
      state: "visible",
      timeout: 5000,
    });

    await page.locator("[data-testid^='storyThumbnail-']").first().click();

    const storyViewer = page.locator("[data-testid='storyViewer']");
    await expect(storyViewer).toBeVisible();

    const storyContent = page.locator("[data-testid='storyContent']");
    const boundingBox = await storyContent.boundingBox();

    if (boundingBox) {
      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.75,
        boundingBox.y + boundingBox.height / 2
      );

      await page.waitForTimeout(500);

      const secondStoryImage = await page
        .locator("[data-testid='storyContent'] img")
        .getAttribute("src");

      await page.mouse.click(
        boundingBox.x + boundingBox.width * 0.25,
        boundingBox.y + boundingBox.height / 2
      );

      await page.waitForTimeout(500);

      const previousStoryImage = await page
        .locator("[data-testid='storyContent'] img")
        .getAttribute("src");

      expect(previousStoryImage).not.toEqual(secondStoryImage);
    }

    await page.locator("[data-testid='closeButton']").click();
  });

  // check for auto progress to next story after 5 seconds
  test("should auto progress to next story after timeout (5 seconds)", async ({
    page,
  }) => {
    await page.waitForSelector("[data-testid^='storyThumbnail-']", {
      state: "visible",
      timeout: 5000,
    });
    await page.locator("[data-testid^='storyThumbnail-']").first().click();

    test.setTimeout(15000);

    const initialImageSrc = await page
      .locator("[data-testid='storyContent'] img")
      .getAttribute("src");

    await expect(page.locator("[data-testid='storyViewer']")).toBeVisible();
    await expect(
      page.locator("[data-testid='storyContent'] img")
    ).toBeVisible();

    await page.waitForTimeout(6000);

    const newImageSrc = await page
      .locator("[data-testid='storyContent'] img")
      .getAttribute("src");

    expect(newImageSrc).not.toEqual(initialImageSrc);

    await page.locator("[data-testid='closeButton']").click();
  });

  // check for posts
  test("should display posts", async ({ page }) => {
    const posts = page.locator("[data-testid='posts']");
    await expect(posts).toBeVisible({ timeout: 5000 });
  });
});

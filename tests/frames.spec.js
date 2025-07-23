const { test } = require("@playwright/test");

//frame[src*="frame_3.html"]
test("frames handling", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  const frame = await page.frameLocator('frame[src*="frame_3.html"]');
  await frame.locator('input[name*="mytext3"]').fill("great");
});

test("Checkbox Selection", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const rows = page.locator("#productTable tbody tr");
  const productName = "Wireless Earbuds";

  for (let i = 0; i < (await rows.count()); i++) {
    let product = await rows.nth(i).locator("td:nth-child(2)").textContent();
    console.log(product, "========");
    if (product.includes(productName)) {
      await rows.nth(i).locator("input[type=checkbox]").click();
      break;
    }
  }
});

test("Auto Sugesstion dropdown - flipkart", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");
  const productName = "watch";
  const searchBox = page.locator("input.Pke_EE");
  await searchBox.waitFor(); // wait for input to be ready
  await searchBox.pressSequentially(productName, { delay: 200 });
  const suggestions = page.locator("ul._1sFryS li"); // Updated selector
  await suggestions.first().waitFor({ timeout: 5000 });

  const count = await suggestions.count();
  console.log("Suggestion count:", count);

  for (let i = 0; i < count; i++) {
    const suggestionText = await suggestions.nth(i).locator("a").textContent();
    console.log(suggestionText, "===");
    if (suggestionText.includes("wild stone perfume")) {
      await suggestions.nth(i).locator("a").click();
      break;
    }
  }
});

import { expect } from "@playwright/test";
import { test } from "./fixtures";

test("Bookmark Job button opens a modal with disabled Send button", async ({
  bookmarkModal,
}) => {
  const { sendButton } = bookmarkModal;

  await expect(sendButton).toBeVisible();
  await expect(sendButton).toBeDisabled();
});

test("Only valid email enters the Send button", async ({ bookmarkModal }) => {
  const { sendButton, emailInput } = bookmarkModal;
  await expect(sendButton).toBeDisabled();
  await emailInput.fill("test@test.test");
  await expect(sendButton).toBeEnabled();
  await emailInput.fill("invalidEmail");
  await expect(sendButton).toBeDisabled();
});

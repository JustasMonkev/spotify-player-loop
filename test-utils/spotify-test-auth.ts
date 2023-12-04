import selectors from "./locators.ts";
import {Page} from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export async function authenticateSpotify(page: Page) {
    if (!process.env.SPOTIFY_CLIENT_EMAIL || !process.env.SPOTIFY_CLIENT_PASSWORD) {
        throw new Error('You must provide SPOTIFY_CLIENT_EMAIL and SPOTIFY_CLIENT_PASSWORD environment variables');
    }
    await page.goto('/');

    await page.locator(selectors.authorizationButton).click({force: true});

    await page.waitForURL(/accounts/);

    await page.locator(selectors.spotifySelectors.userNameInput).fill(process.env.SPOTIFY_CLIENT_EMAIL);
    await page.locator(selectors.spotifySelectors.passwordInput).fill(process.env.SPOTIFY_CLIENT_PASSWORD);

    await page.locator(selectors.spotifySelectors.loginButton).click();

    await page.waitForURL('**/authorize*');

    await page.locator(selectors.spotifySelectors.allowButton).click();

    await page.waitForURL('spotify/player');
}

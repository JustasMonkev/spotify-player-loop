import {expect, test} from "@playwright/test";
import {authenticateSpotify} from "../test-utils/spotify-test-auth";
import selectors from "../test-utils/locators";
import {STORAGE_PATH_PATH} from "../playwright.config";


test('test', async ({page}) => {
    await authenticateSpotify(page)

    await page.waitForURL('spotify/player')

    await expect(page.locator(selectors.songStarTimeInput)).toBeHidden()
    await expect(page.locator(selectors.songEndTimeInput)).toBeHidden()
    await expect(page.locator(selectors.playSongButton)).toBeHidden()
    await expect(page.locator(selectors.pauseSongButton)).toBeHidden()
    await page.context().storageState({path: STORAGE_PATH_PATH})
});

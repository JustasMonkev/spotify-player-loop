import {test} from '@playwright/test';
import {STORAGE_PATH_PATH} from "../playwright.config";
import fs from 'fs';

test.skip('spotify.teardown.spec.ts.spec.ts', async ({}) => {
    fs.unlinkSync(STORAGE_PATH_PATH);
    console.log('Deleted storage state')
});

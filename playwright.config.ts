import {defineConfig, devices} from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();

export const STORAGE_PATH_PATH = './playwright/.auth/storage.json'

export default defineConfig({
    timeout: 30000,
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 4 : 20,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: process.env.BASE_URL || 'http://localhost:5173/',
        trace: 'on',
        viewport: {width: 1920, height: 1080},
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'setup',
            use: {...devices['Desktop Chrome'], headless: true, viewport: {width: 1920, height: 1080}},
            testMatch: '**/spotify.setup.spec.ts'
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                storageState: STORAGE_PATH_PATH
            },
            testIgnore: ['**/spotify.setup.spec.ts'],
            dependencies: ['setup'],
        },
    ],
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173/'
    },
});

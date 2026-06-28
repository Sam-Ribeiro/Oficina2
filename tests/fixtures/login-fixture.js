import { test as base } from '@playwright/test';

import { performLogin } from '../helpers/login-helpers';

export const test = base.extend({

    loggedPage: async ({ page }, use) => {

        await performLogin(page);

        await use(page);

    }

});

export { expect } from '@playwright/test';
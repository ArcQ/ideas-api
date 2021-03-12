import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';

import { STORIES_CONFIGURED } from '@storybook/core-events';
import addonAPI from '@storybook/addons';

addonAPI.register('my-organisation/first-page', (storybookAPI) => {
  storybookAPI.on(STORIES_CONFIGURED, () => {
    if (storybookAPI.getUrlState().path === '/story/*') {
      storybookAPI.selectStory('KfForm', 'basic');
    }
  });
});

import { FlowRouter } from 'meteor/kadira:flow-router';

import { mountLayout, showLayout } from '/client/mount';
import asyncLoader, { importDefault } from '/client/async-loader';




FlowRouter.route('/', {
  name: 'frontend.home',
  action() {
    asyncLoader([
      importDefault(import('/client/imports/layouts/ErrorLayout'), 'ErrorLayout'),
      importDefault(import('/modules/frontend/client/imports/components/Home'), 'HomeComponent')
    ]).then(({ ErrorLayout, HomeComponent }) => {
      mountLayout(ErrorLayout, {
        title: 'frontend.home.title',
        content: HomeComponent
      });
    });

  }
});

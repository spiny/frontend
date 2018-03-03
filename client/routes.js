import { FlowRouter } from 'meteor/kadira:flow-router';

import { mountLayout, showLayout } from '/client/mount';
import asyncLoader, { importDefault } from '/client/async-loader';




FlowRouter.route('/', {
  name: 'frontend.home',
  action() {
    asyncLoader([
      importDefault(import('/client/imports/layouts/AbstractLayout'), 'AbstractLayout'),
      importDefault(import('/modules/frontend/client/imports/components/Home'), 'HomeComponent')
    ]).then(({ AbstractLayout, HomeComponent }) => {
      mountLayout(AbstractLayout, {
        title: 'frontend.home.title',
        content: HomeComponent
      });
    });

  }
});

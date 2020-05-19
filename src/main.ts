import Vue from 'vue';
import App from './App.vue';
import { RestApiSnippetMapper } from '@/core/dal/infrastructure/RestApiSnippetMapper';
import { SnippetListQueryHandler } from '@/core/bl/infrastructure/SnippetListQueryHandler';
import { SnippetItemQueryHandler } from '@/core/bl/infrastructure/SnippetItemQueryHandler';
import { CreateSnippetQueryHandler } from '@/core/bl/infrastructure/CreateSnippetQueryHandler';
import { UpdateSnippetQueryHandler } from '@/core/bl/infrastructure/UpdateSnippetQueryHandler';
import { DeleteSnippetCommandHandler } from '@/core/bl/infrastructure/DeleteSnippetCommandHandler';
import { ServiceProviders } from '@/ServiceProviders';

Vue.config.productionTip = false;

const restApiSnippetMapper = new RestApiSnippetMapper('https://localhost:5001/api/v1/');

new Vue({
  provide: () => ({
    [ServiceProviders.ISnippetListQueryHandler]: new SnippetListQueryHandler(restApiSnippetMapper),
    [ServiceProviders.ISnippetItemQueryHandler]: new SnippetItemQueryHandler(restApiSnippetMapper),
    [ServiceProviders.ICreateSnippetQueryHandler]: new CreateSnippetQueryHandler(restApiSnippetMapper),
    [ServiceProviders.IUpdateSnippetQueryHandler]: new UpdateSnippetQueryHandler(restApiSnippetMapper),
    [ServiceProviders.IDeleteSnippetCommandHandler]: new DeleteSnippetCommandHandler(restApiSnippetMapper),
  }),
  render: (h) => h(App),
}).$mount('#app');

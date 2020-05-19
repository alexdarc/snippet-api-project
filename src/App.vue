<template>
  <div id="app">
    <SnippetListComponent v-bind:snippetModelList="snippetItemList"
                          v-on:on-delete="deleteSnippet($event)"
                          v-on:on-edit="editSnippet($event)"/>

    <div v-if="canEditSnippet">
      <h2>Edit snippet:</h2>
      <EditSnippetComponent v-bind:snippet-model="currentEditableSnippetModel"
                            v-on:on-save="saveSnippet($event)"/>
      <button v-on:click="cancelEditSnippet()">Cancel</button>
    </div>
    <div v-if="!canEditSnippet">
      <h2>Add snippet:</h2>
      <EditSnippetComponent v-bind:snippet-model="emptySnippetModel"
                            v-on:on-save="addSnippet($event)"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import SnippetListComponent from '@/components/SnippetListComponent/SnippetListComponent.vue';
  import EditSnippetComponent from '@/components/EditSnippetComponent/EditSnippetComponent.vue';
  import { EditSnippetModel } from '@/components/EditSnippetComponent/models/EditSnippetModel';
  import { Utils } from '@/utils/Utils';
  import { SnippetListItem } from '@/components/SnippetListComponent/models/SnippetListItem';
  import { DateTimeFormats } from '@/utils/DateTimeFormats';
  import moment from 'moment';
  import { ISnippetListQueryHandler, SnippetListQuery } from '@/core/bl/contracts/SnippetListQuery';
  import {
    IUpdateSnippetQueryHandler,
    UpdateSnippetQuery
  } from '@/core/bl/contracts/UpdateSnippetQuery';
  import {
    CreateSnippetQuery,
    ICreateSnippetQueryHandler
  } from '@/core/bl/contracts/CreateSnippetQuery';
  import {
    DeleteSnippetCommand,
    IDeleteSnippetCommandHandler
  } from '@/core/bl/contracts/DeleteSnippetCommand';
  import { ISnippetItemQueryHandler, SnippetItemQuery } from '@/core/bl/contracts/SnippetItemQuery';
  import { SnippetItemModel } from '@/core/bl/contracts/models/SnippetItemModel';
  import { SnippetListQueryHandler } from '@/core/bl/infrastructure/SnippetListQueryHandler';
  import { RestApiSnippetMapper } from '@/core/dal/infrastructure/RestApiSnippetMapper';
  import { SnippetItemQueryHandler } from '@/core/bl/infrastructure/SnippetItemQueryHandler';
  import { CreateSnippetQueryHandler } from '@/core/bl/infrastructure/CreateSnippetQueryHandler';
  import { UpdateSnippetQueryHandler } from '@/core/bl/infrastructure/UpdateSnippetQueryHandler';
  import { DeleteSnippetCommandHandler } from '@/core/bl/infrastructure/DeleteSnippetCommandHandler';

  @Component({
    components: {
      EditSnippetComponent,
      SnippetListComponent,
    },
  })
  export default class App extends Vue {
    private readonly snippetListQueryHandler: ISnippetListQueryHandler;
    private readonly snippetItemQueryHandler: ISnippetItemQueryHandler;
    private readonly createSnippetQueryHandler: ICreateSnippetQueryHandler;
    private readonly updateSnippetQueryHandler: IUpdateSnippetQueryHandler;
    private readonly deleteSnippetCommandHandler: IDeleteSnippetCommandHandler;

    private readonly limit = 50;
    private readonly offset = 0;

    constructor(
    ) {
      super();
      const restApiSnippetMapper = new RestApiSnippetMapper('https://localhost:5001/api/v1/');
      this.snippetListQueryHandler = new SnippetListQueryHandler(restApiSnippetMapper);
      this.snippetItemQueryHandler = new SnippetItemQueryHandler(restApiSnippetMapper);
      this.createSnippetQueryHandler = new CreateSnippetQueryHandler(restApiSnippetMapper);
      this.updateSnippetQueryHandler = new UpdateSnippetQueryHandler(restApiSnippetMapper);
      this.deleteSnippetCommandHandler = new DeleteSnippetCommandHandler(restApiSnippetMapper);
    }

    snippetItemModels: SnippetItemModel[] = [];

    get snippetItemList(): SnippetListItem[] {
      return this.snippetItemModels.map(snippetItemModel => new SnippetListItem(
        snippetItemModel.id,
        snippetItemModel.content,
        snippetItemModel.description,
        moment(snippetItemModel.createdDate).format(DateTimeFormats.longDate),
      ));
    }

    currentEditableSnippetModel: EditSnippetModel = new EditSnippetModel(
      Utils.emptyString,
      Utils.emptyString,
      Utils.emptyString);

    canEditSnippet = false;

    emptySnippetModel: EditSnippetModel = new EditSnippetModel(
      Utils.emptyString,
      Utils.emptyString,
      Utils.emptyString);

    async mounted() {
      await this.updateSnippetItems();
    }

    async updateSnippetItems() {
      this.snippetItemModels = await this.snippetListQueryHandler
        .HandleAsync(new SnippetListQuery(
          this.limit, this.offset
        ));
    }

    async deleteSnippet(id: string) {
      await this.deleteSnippetCommandHandler
        .HandleAsync(new DeleteSnippetCommand(id));
      await this.updateSnippetItems();
    }

    async editSnippet(id: string) {
      const snippetItemModel = await this.snippetItemQueryHandler
        .HandleAsync(new SnippetItemQuery(id));

      this.currentEditableSnippetModel = new EditSnippetModel(
        snippetItemModel.id,
        snippetItemModel.content,
        snippetItemModel.description,
      );
      this.canEditSnippet = true;
    }

    cancelEditSnippet() {
      this.canEditSnippet = false;
    }

    async saveSnippet(snippetModel: EditSnippetModel) {
      await this.updateSnippetQueryHandler
        .HandleAsync(new UpdateSnippetQuery(
          snippetModel.id,
          snippetModel.content,
          snippetModel.description
        ));
      await this.updateSnippetItems();
      this.canEditSnippet = false;
    }

    async addSnippet(snippetModel: EditSnippetModel) {
      await this.createSnippetQueryHandler
        .HandleAsync(new CreateSnippetQuery(
          snippetModel.content,
          snippetModel.description
        ))
      await this.updateSnippetItems();

      this.canEditSnippet = false;
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

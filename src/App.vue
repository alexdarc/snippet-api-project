<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md">
          <SnippetListComponent
            v-bind:snippetModelList="snippetItemList"
            v-bind:editable-snippet-id="editableSnippetId"
            v-bind:viewable-snippet-id="viewableSnippetId"
            v-on:on-delete="deleteSnippet($event)"
            v-on:on-edit="editSnippet($event)"
            v-on:on-preview="previewSnippet($event)"/>
        </div>
        <div class="col-md">
          <div class="editor-window sticky-top h-100">
            <div v-if="canEditSnippet"
                 class="d-flex flex-column h-100">
              <h2>Edit snippet:</h2>
              <EditSnippetComponent
                v-bind:snippet-model="currentEditableSnippetModel"
                v-on:on-save="saveSnippet($event)"
                v-bind:show-cancel="true"
                v-on:on-cancel="cancelEditSnippet()"/>
            </div>
            <div v-if="canPreviewSnippet">
              <h2>
                Preview:
                <button
                  v-on:click="cancelPreviewSnippet()"
                  class="btn btn-sm">Cancel</button>
              </h2>
              <PreviewSnippetComponent
                v-bind:preview-snippet-model="currentViewableSnippetModel"/>
            </div>
            <div v-if="canAddSnippet"
                 class="d-flex flex-column h-100">
              <h2>Add snippet:</h2>
              <EditSnippetComponent
                v-bind:snippet-model="emptySnippetModel"
                v-on:on-save="addSnippet($event)"
                v-bind:show-cancel="false"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Inject, Vue } from 'vue-property-decorator';
  import SnippetListComponent from '@/components/SnippetListComponent/SnippetListComponent.vue';
  import EditSnippetComponent from '@/components/EditSnippetComponent/EditSnippetComponent.vue';
  import { EditSnippetModel } from '@/components/EditSnippetComponent/models/EditSnippetModel';
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
  import { ServiceProviders } from '@/ServiceProviders';
  import { Utils } from '@/utils/Utils';
  import PreviewSnippetComponent
    from '@/components/PreviewSnippetComponent/PreviewSnippetComponent.vue';
  import { PreviewSnippetModel } from '@/components/PreviewSnippetComponent/models/PreviewSnippetModel';

  @Component({
    components: {
      PreviewSnippetComponent,
      EditSnippetComponent,
      SnippetListComponent,
    },
  })
  export default class App extends Vue {
    @Inject(ServiceProviders.ISnippetListQueryHandler) private readonly snippetListQueryHandler!: ISnippetListQueryHandler;
    @Inject(ServiceProviders.ISnippetItemQueryHandler) private readonly snippetItemQueryHandler!: ISnippetItemQueryHandler;
    @Inject(ServiceProviders.ICreateSnippetQueryHandler) private readonly createSnippetQueryHandler!: ICreateSnippetQueryHandler;
    @Inject(ServiceProviders.IUpdateSnippetQueryHandler) private readonly updateSnippetQueryHandler!: IUpdateSnippetQueryHandler;
    @Inject(ServiceProviders.IDeleteSnippetCommandHandler) private readonly deleteSnippetCommandHandler!: IDeleteSnippetCommandHandler;

    private readonly limit = 50;
    private readonly offset = 0;
    private readonly maxContentSize = 255;
    private readonly maxDescriptionSize = 255;

    snippetItemModels: SnippetItemModel[] = [];

    get snippetItemList(): SnippetListItem[] {
      return this.snippetItemModels.map(snippetItemModel => new SnippetListItem(
        snippetItemModel.id,
        snippetItemModel.content.slice(0, this.maxContentSize),
        snippetItemModel.description.slice(0, this.maxDescriptionSize),
        moment(snippetItemModel.createdDate).format(DateTimeFormats.longDate),
      ));
    }

    currentEditableSnippetModel: EditSnippetModel | null = null;
    emptySnippetModel: EditSnippetModel = new EditSnippetModel(Utils.emptyString, Utils.emptyString, Utils.emptyString);

    currentViewableSnippetModel: PreviewSnippetModel | null = null;

    get editableSnippetId(): string | undefined {
      return this.currentEditableSnippetModel?.id;
    }

    get viewableSnippetId(): string | undefined {
      return this.currentViewableSnippetModel?.id;
    }

    get canPreviewSnippet(): boolean {
      return this.currentViewableSnippetModel != null;
    }

    get canEditSnippet(): boolean {
      return this.currentEditableSnippetModel != null;
    }

    get canAddSnippet(): boolean {
      return !this.canEditSnippet && !this.canPreviewSnippet;
    }

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

      this.cancelAllActions();
      this.currentEditableSnippetModel = new EditSnippetModel(
        snippetItemModel.id,
        snippetItemModel.content,
        snippetItemModel.description,
      );
    }

    cancelPreviewSnippet() {
      this.currentViewableSnippetModel = null;
    }

    cancelEditSnippet() {
      this.currentEditableSnippetModel = null;
    }

    cancelAllActions() {
      this.cancelPreviewSnippet();
      this.cancelEditSnippet();
    }

    async saveSnippet(snippetModel: EditSnippetModel) {
      await this.updateSnippetQueryHandler
        .HandleAsync(new UpdateSnippetQuery(
          snippetModel.id,
          snippetModel.content,
          snippetModel.description
        ));
      await this.updateSnippetItems();
      this.cancelEditSnippet();
    }

    async addSnippet(snippetModel: EditSnippetModel) {
      await this.createSnippetQueryHandler
        .HandleAsync(new CreateSnippetQuery(
          snippetModel.content,
          snippetModel.description
        ))
      await this.updateSnippetItems();
      this.cancelEditSnippet();
    }

    async previewSnippet(id: string) {
      const snippetItemModel = await this.snippetItemQueryHandler
        .HandleAsync(new SnippetItemQuery(id));

      this.cancelAllActions();
      this.currentViewableSnippetModel = new PreviewSnippetModel(
        snippetItemModel.id,
        snippetItemModel.content,
      );
    }
  }
</script>

<style>
  #app {
    padding: 20px;
  }

  .editor-window {
    max-height: calc(100vh - 20px);
    min-height: 500px;
    overflow: auto;
  }
</style>

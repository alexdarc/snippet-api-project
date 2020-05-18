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
  import { ISnippetsService } from '@/services/SnippetsService/ISnippetsService';
  import SnippetsService from '@/services/SnippetsService/SnippetsService';
  import { ApiService } from '@/services/ApiService/ApiService';
  import EditSnippetComponent from '@/components/EditSnippetComponent/EditSnippetComponent.vue';
  import { SnippetModel } from '@/models/SnippetModel';
  import { EditSnippetModel } from '@/components/EditSnippetComponent/models/EditSnippetModel';
  import { Utils } from '@/utils/Utils';
  import { UpdateServiceSnippetModel } from '@/services/SnippetsService/UpdateServiceSnippetModel';
  import { AddServiceSnippetModel } from '@/services/SnippetsService/AddServiceSnippetModel';
  import { SnippetListItem } from '@/components/SnippetListComponent/models/SnippetListItem';
  import { DateTimeFormats } from '@/utils/DateTimeFormats';
  import moment from 'moment';

  @Component({
    components: {
      EditSnippetComponent,
      SnippetListComponent,
    },
  })
  export default class App extends Vue {
    snippetService: ISnippetsService = new SnippetsService(
      new ApiService('https://localhost:5001/api/v1/'),
    );

    snippetModels: SnippetModel[] = [];
    get snippetItemList(): SnippetListItem[] {
      return this.snippetModels.map(snippetModel => new SnippetListItem(
        snippetModel.id,
        snippetModel.content,
        snippetModel.description,
        moment(snippetModel.createDate).format(DateTimeFormats.longDate),
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

    mounted() {
      this.snippetService
        .getSnippets(50, 0)
        .then((snippetModels: SnippetModel[]) => {
          this.snippetModels = snippetModels;
        });
    }

    deleteSnippet(id: string) {
      this.snippetService.removeSnippet(id);
    }

    editSnippet(id: string) {
      this.snippetService.getSnippet(id)
        .then((snippetModel) => {
          this.currentEditableSnippetModel = new EditSnippetModel(
            snippetModel.id,
            snippetModel.content,
            snippetModel.description,
          );
          this.canEditSnippet = true;
        });
    }

    cancelEditSnippet() {
      this.canEditSnippet = false;
    }

    saveSnippet(snippetModel: EditSnippetModel) {
      this.snippetService.updateSnippet(new UpdateServiceSnippetModel(
        snippetModel.id,
        snippetModel.content,
        snippetModel.description,
      ))
        .then(() => {
          this.canEditSnippet = false;
        });
    }

    addSnippet(snippetModel: EditSnippetModel) {
      this.snippetService.addSnippet(new AddServiceSnippetModel(
        snippetModel.content,
        snippetModel.description,
      ))
        .then(() => {
          this.canEditSnippet = false;
        });
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

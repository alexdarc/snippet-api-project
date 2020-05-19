<template>
  <form v-on:submit.prevent="submitForm"
        class="d-flex flex-column flex-fill">
    <div class="form-group">
      <label for="description">Description</label>
      <input
        v-model="snippetModel.description"
        type="text"
        class="form-control"
        id="description"
        placeholder="Something about snippet">
    </div>
    <div class="form-group d-flex flex-column flex-fill">
      <label for="content">Content</label>
      <textarea
        v-model="snippetModel.content"
        class="form-control flex-fill"
        id="content"
        placeholder="Snippet code..."></textarea>
    </div>
    <div class="form-group">
      <button type="submit"
              class="btn btn-primary">Confirm
      </button>
      <button
        v-if="showCancel"
        v-on:click="onCancel()"
        type="button"
        class="btn btn-secondary ml-2">Cancel
      </button>
    </div>
  </form>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { EditSnippetModel } from '@/components/EditSnippetComponent/models/EditSnippetModel';

  @Component({})
  export default class EditSnippetComponent extends Vue {
    @Prop({
      type: EditSnippetModel,
      required: true,
    }) snippetModel!: EditSnippetModel;
    @Prop({
      type: Boolean,
      required: true,
    }) showCancel!: boolean;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function
    @Emit() onSave(snippetModel: EditSnippetModel) {
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    @Emit() onCancel() {
    }

    submitForm() {
      if (this.snippetModel.content.length === 0 || this.snippetModel.description.length === 0) {
        return;
      }

      this.onSave(new EditSnippetModel(
        this.snippetModel.id,
        this.snippetModel.content,
        this.snippetModel.description));

      this.clearForm();
    }

    clearForm() {
      this.snippetModel.content = '';
      this.snippetModel.description = '';
    }
  }
</script>

<style scoped>

</style>

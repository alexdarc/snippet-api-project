<template>
  <form v-on:submit.prevent="submitForm">
    <label>Description:
      <input type="text" v-model="snippetModel.description">
    </label>
    <label>Content:
      <textarea v-model="snippetModel.content"
                cols="30"
                rows="10"></textarea>
    </label>
    <button type="submit">Submit</button>
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
    @Emit() onSave(snippetModel: EditSnippetModel) {}

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

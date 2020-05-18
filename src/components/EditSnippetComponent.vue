<template>
  <form v-on:submit.prevent="submitForm">
    <label>Description:
      <input type="text" v-model="description">
    </label>
    <label>Content:
      <textarea v-model="content"
                cols="30"
                rows="10"></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { SnippetModel } from '@/models/SnippetModel';

  @Component({})
  export default class EditSnippetComponent extends Vue {
    @Prop({
      type: SnippetModel,
      required: true,
    }) snippetModel!: SnippetModel;
    @Emit() onSave(snippetModel: SnippetModel) {}

    _description = '';
    get description() {
      return this.snippetModel.description;
    }
    set description(value: string) {
      this._description = value;
    }

    _content = '';
    get content() {
      return this.snippetModel.content;
    }
    set content(value: string) {
      this._content = value;
    }

    submitForm() {
      if (this._content.length === 0 || this._description.length === 0) {
        return;
      }

      this.onSave(new SnippetModel('', this._content, this._description));

      this.content = '';
      this.description = '';
    }
  }
</script>

<style scoped>

</style>

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
    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ISnippetsService } from '@/services/ISnippetsService';
  import { SnippetModel } from '@/models/SnippetModel';

  @Component({})
  export default class AddSnippetComponent extends Vue {
    @Prop({
      type: Object as () => ISnippetsService,
      required: true,
    }) private snippetService!: ISnippetsService;

    description = '';
    content = '';

    submitForm() {
      if (this.content.length === 0 || this.description.length === 0) {
        return;
      }

      this.snippetService.addSnippet(new SnippetModel('', this.content, this.description));
      this.content = '';
      this.description = '';
    }
  }
</script>

<style scoped>

</style>

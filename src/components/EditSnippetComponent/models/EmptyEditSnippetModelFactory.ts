import { EditSnippetModel } from '@/components/EditSnippetComponent/models/EditSnippetModel';
import { Utils } from '@/utils/Utils';

export class EmptyEditSnippetModelFactory {
  static build(): EditSnippetModel {
    return new EditSnippetModel(
      Utils.emptyString,
      Utils.emptyString,
      Utils.emptyString);
  }
}

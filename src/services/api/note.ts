import BaseApi from './base';

class NoteApi extends BaseApi {
  constructor() {
    super('Note');
  }

  get = async (): Promise<Parse.Object[]> => {
    const query = this.useQuery();
    query.descending('updatedAt');

    const queryResult = await query.find();

    return queryResult;
  }

  create = async (data: NoteInput): Promise<Parse.Object> => {
    return this.createSavedWithParams(data);
  }

  update = async (id: string, params: Partial<NoteInput>): Promise<Parse.Object> => {
    const query = this.useQuery();
    const obj = await query.get(id);

    if (params) {
      for (const key of Object.keys(params)) {
        obj.set(key, params[key]);
      }
    }

    return obj.save();
  }

  delete = async (id: string): Promise<Parse.Object> => {
    const query = this.useQuery();
    const obj = await query.get(id);

    return obj.destroy();
  }
}

export default NoteApi;
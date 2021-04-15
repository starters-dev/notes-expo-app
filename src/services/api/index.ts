import NoteApi from './note';

class Api implements IService {
  note: NoteApi;

  constructor() {
    this.note = new NoteApi();
  }

  init = async () => {
    // some actions
  }
}

export default new Api();
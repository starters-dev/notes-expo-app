import { makeAutoObservable } from 'mobx';
import { isSynchronized, persistence } from 'mobx-persist-store';
import { services } from '../services';
import { storageAdapter } from './hydration';

class GlobalStore {
  parseURL: string = '';
  setParseURL = (v: string) => {
    this.parseURL = v;
    services.parse.setServerURL(this.parseURL);
  }
  clearParseURL = () => this.setParseURL('');

  notes: Note[] = [];
  setNotes = (v: Note[]) => { this.notes = v; }

  get isSynced() {
    return isSynchronized(this)
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default persistence({
  name: 'GlobalStore',
  properties: ['parseURL', 'notes'],
  adapter: storageAdapter,
})(new GlobalStore());

// export default new GlobalStore();
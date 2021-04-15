import Parse from 'parse';

class ParseService implements IService {
  init = async () => {
    Parse.setAsyncStorage(localStorage);
    Parse.initialize('APP_ID', '', 'SUPER_SECRET_MASTER_KEY');
  }

  setServerURL = (url: string) => {
    if (url.includes('/parse')) Parse.serverURL = url;
    else
      if (url[url.length - 1] !== '/') Parse.serverURL = `${url}/parse`;
      else                             Parse.serverURL = `${url}parse`;
  }
}

export default new ParseService();
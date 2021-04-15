import Parse from 'parse/react-native'; // for web just 'parse'

class BaseApi {
  private ParseClassName: string = '';
  protected _obj;

  constructor(parseClassName: string) {
    this.ParseClassName = parseClassName;

    if (parseClassName === 'User')
      this._obj = Parse.User;
    else
      this._obj = Parse.Object.extend(this.ParseClassName);
  }

  protected useQuery = () => new Parse.Query(this._obj);
  newObject = (): Parse.Object => new this._obj();

  createWithParams = (params?: any): Parse.Object => {
    const obj = this.newObject();

    if (params) {
      for (const key of Object.keys(params)) {
        obj.set(key, params[key]);
      }
    }

    return obj;
  }

  createSavedWithParams = async (params?: any): Promise<Parse.Object> => {
    const obj = this.createWithParams(params);

    return obj.save();
  }
}

export default BaseApi;
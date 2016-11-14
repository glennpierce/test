import {inject, Lazy, autoinject, singleton} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

function mapToJson(map) : string {
    return JSON.stringify(Array.from(map.entries()));
    //return "";
}

export interface IPage {
  id: number;
  title: string;
  header: string;
  section_name: string;
}

export interface IFlatPage {
  id: number;
  title: string;
  header: string;
  section_name: string;
  sidebar_content: string,
  outer_content: string,
  content: string,
  active: boolean,
}

@inject(Lazy.of(HttpClient))
export class Shimmy {
  debug : boolean = false;
  base : string = 'http://test/';
  pages: Array<IPage> = [];
  // speakers: Array<Speaker> = [];
  // queue: QueueContainer = new Map<number, ITrack>();
  http: HttpClient;

  constructor(private getHttpClient: () => HttpClient) {
    //this.queue = jsonToMap(localStorage.getItem("queue"));

    this.http = this.getHttpClient();

    let self = this;

    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(self.base)
        .withDefaults({
            headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
              'X-Requested-With': 'Fetch'
            }
          })
          .withInterceptor(this.tokenInterceptor);
    });

    this.getUserData();
  }

  isAuthenticated() {
    return false;
  }

  get tokenInterceptor() {
    
    //let config = this.config;
    let self = this;
    return {
      request(request) {
        if (self.isAuthenticated()) { 
          let token = localStorage.getItem("token");
          request.headers.append('Authorization', 'Token ' + token);
        }
        return request;
      }
    };
  }

  async loginUUID(uuid: string) {

  }

  async loginUsername(username: string, password : string) {

  }

  async getUserData() {

  }

  async getPages() {

    return [];
  }
}

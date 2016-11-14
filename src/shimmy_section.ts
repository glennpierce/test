import {Aurelia, inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Shimmy, IPage} from './shimmy';
import {App} from './app';
import {SectionDetails} from './section_details';
import {Login} from './login';


@inject(App, Shimmy, DialogService)
export class ShimmySection {
  private title : string;
  private page : number;
  private section_detail : SectionDetails;

  constructor(private app: App, private shimmy: Shimmy,
              private dialogService: DialogService) {    

        let gg=67;
  }

  showFlatPage(flatpage: number) {
    this.page = flatpage;
  }

  activate(urlParams, routeMap, navInstr) {
   
    let self = this;

    if(this.shimmy.isAuthenticated()) {
      if(urlParams.id === undefined) {
        this.section_detail = this.app.section_pages.get('yourhome');
      }
      else {
        this.section_detail = this.app.section_pages.get(urlParams.id);
      }
      return;
    }

    if(!urlParams.hasOwnProperty('uuid')) {

      let auth = { username: '', password: '', error : ""};

      this.dialogService.open({ viewModel: Login, model: auth}).then(response => {

        if (!response.wasCancelled) {
          this.shimmy.loginUsername(response.output.username, response.output.password);

          if(this.shimmy.isAuthenticated()) {
              this.section_detail = this.app.section_pages.get('yourhome');
          }
        }
      });
    }
    else {
      // Log in with uuid
      this.shimmy.loginUUID(urlParams.uuid);
    }
  }
}

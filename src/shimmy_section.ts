import {Aurelia, inject} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Shimmy, IPage} from './shimmy';
import {App} from './app';
import {SectionDetails} from './section_details';
//import {Login} from './login';


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

/*   
    let self = this;

    let auth = { username: '', password: '', error : ""};

    self.dialogService.open({ viewModel: 'login', model: auth}).catch(response => {

      console.log(response);
    });
*/

  }
}

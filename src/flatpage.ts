import {Aurelia, inject, bindable, InlineViewStrategy} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {Shimmy, IPage, IFlatPage} from './shimmy';
import {App} from './app';
import {SectionDetails} from './section_details';
import {Login} from './login';


@inject(Shimmy)
export class Flatpage {
  @bindable view;
  @bindable model;
  @bindable templateHref;
  @bindable viewStrategy : InlineViewStrategy;

  @bindable public page; // : Promise<IFlatPage>;
  //@bindable details; // : Promise<IFlatPage>;

  constructor(private shimmy: Shimmy) {    
  }

  viewChanged() {
    if (this.view) {

      this.view = this.view.replace('src="/static', 'src="' + this.shimmy.base + '/static/');
      this.view = this.view.replace('link="/static', 'src="' + this.shimmy.base + '/static/');

      let tmp = '<template>' +
                '<require from="./components/shimmy_dialog"></require>' +
                this.view +
                '</template>';

      this.viewStrategy = new InlineViewStrategy(tmp);
    }
  }
  
  async pageChanged(newValue) {
    // if (this.page) {
    //   let details = await this.shimmy.fetchPage(newValue);
    //   this.model = details;
    //   this.view = details.content;
    // }
  }
}

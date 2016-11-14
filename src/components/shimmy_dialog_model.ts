import {Aurelia, inject, noView, bindable, processContent, customElement} from 'aurelia-framework';
import {DialogController, DialogService} from 'aurelia-dialog';

@inject(DialogController)
export class ShimmyDialogModel {
  private type : string;

  constructor(private controller : DialogController){
    console.log("here");
  }

  async activate(state){
    this.type = state['type'];
  }

  isVideo() : boolean {
    return this.type === "video";
  }

  isIframe() : boolean {
    return this.type === "iframe";
  }
}

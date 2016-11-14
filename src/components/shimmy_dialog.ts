import {Aurelia, inject, noView, bindable, processContent, customElement} from 'aurelia-framework';
import {DialogController, DialogService} from 'aurelia-dialog';
import {ShimmyDialogModel} from './shimmy_dialog_model';

@noView
@processContent(false)
@customElement('shimmy-dialog') 
@inject(Element, DialogService)
export class ShimmyDialog {
  @bindable public type : string;
  @bindable public href;
  @bindable public name;
  private originalContent : string;

  constructor(private element: Element, private dialogService: DialogService) {    
    this.originalContent = this.element.innerHTML;
    this.type = this.element.getAttribute("type");
  }

  bind() {
    this.element.innerHTML = '<a href="#">' + this.originalContent + '</a>';
  }

  attached() {
    let self = this;

    this.element.children[0].addEventListener("click", function(){ 
      if(self.type === "iframe") {
        self.dialogService.open({ viewModel: ShimmyDialogModel, model: {'type':"iframe"}}).then(response => {
        });
      }
      else if(self.type === "video") {
        self.dialogService.open({ viewModel: ShimmyDialogModel, model: {'type':"video"}}).then(response => {
        });
      }
      return false;
    });

  }

  async hrefChanged(newValue) {
    this.href = newValue;
  }
}
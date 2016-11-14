import {Aurelia, inject} from 'aurelia-framework';
import {IPage} from './shimmy';


export class SectionDetails {
    id : string;
    title : string;
    pages : IPage[];

    constructor(id: string, title: string, pages: IPage[]) {
        this.id = id;
        this.title = title;
        this.pages = pages;
    }
}
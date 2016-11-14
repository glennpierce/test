import {Aurelia, inject} from 'aurelia-framework';
import {Router, RouterConfiguration, NavigationInstruction} from 'aurelia-router';
import {Shimmy, IPage} from './shimmy';
import {SectionDetails} from './section_details';


@inject(Shimmy, Router)
export class App {

  section_pages : Map<string, SectionDetails> = new Map<string, SectionDetails>();

  async configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Shimmy';
    config.options.root = '/';

    config.map([
      { route: ['', 'shimmy_section/:id', 'uuid/:uuid'], href:'shimmy_section/yourhome', name: 'yourhome', moduleId: "./shimmy_section", nav:true, title: 'Your Home'},
      { route: "shimmy_section/:id", href:'shimmy_section/yourcommunity', name: 'yourcommunity', moduleId: "./shimmy_section", nav:true, title: 'Your Community'},
      { route: "shimmy_section/:id", href:'shimmy_section/yourtravel', name: 'yourtravel', moduleId: "./shimmy_section", nav:true, title: 'Your Travel'},
      { route: "shimmy_section/:id", href:'shimmy_section/yourenergyandwater', name: 'yourenergyandwater', moduleId: "./shimmy_section", nav:true, title: 'Energy & Water'},
      { route: "shimmy_section/:id", href:'shimmy_section/yourneighbourhood', name: 'yourneighbourhood', moduleId: "./shimmy_section", nav:true, title: 'Your Neighbourhood'},
      { route: "shimmy_section/:id", href:'shimmy_section/ourvision', name: 'ourvision', moduleId: "./shimmy_section", nav:true, title: 'Your Vision'},
    ]);

    this.router = router;

    this.router.refreshNavigation();
  }

  constructor(private shimmy: Shimmy, private router: Router) {
    //this.router.refreshNavigation();
  }

  groupBy( array , f )
  {
    var groups = {};
    array.forEach( function( o )
    {
      var group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );  
    });
    return Object.keys(groups).map( function( group )
    {
      return groups[group]; 
    })
  }

  async groupPages() {
    let pages = await this.shimmy.getPages();
  
    let sections = await this.groupBy(pages, function(p)
    {
        return [p.section_name.toLowerCase()];
    });

    for(var i=0; i < sections.length; i++) {
        console.log(sections[i][0].section_name);
        let title =  sections[i][0].section_name;
        let key = title.toLowerCase().replace(/\s+/g, '');   
        this.section_pages.set(key, new SectionDetails(key, title, sections[i]));
    }
  }

  async activate(params) {
    await this.groupPages();
  }
}

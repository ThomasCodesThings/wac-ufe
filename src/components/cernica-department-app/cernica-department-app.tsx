import { Component, Host, Prop, State, h } from '@stencil/core';
declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'cernica-department-app',
  styleUrl: 'cernica-department-app.css',
  shadow: true,
})
export class CernicaDepartmentApp {

  @State() private relativePath = "";

   @Prop() basePath: string="";
   @Prop() apiBase: string="";

   componentWillLoad() {
     const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

     const toRelative = (path: string) => {
       if (path.startsWith( baseUri)) {
         this.relativePath = path.slice(baseUri.length)
       } else {
         this.relativePath = ""
       }
     }

     window.navigation?.addEventListener("navigate", (ev: Event) => {
       if ((ev as any).canIntercept) { (ev as any).intercept(); }
       let path = new URL((ev as any).destination.url).pathname;
       toRelative(path);
     });

     toRelative(location.pathname)
   }

   render() {
    let element = "list"
    let entryId = "@new"

    switch (true) {
      case this.relativePath.startsWith('edit'):
        element = 'edit';
        entryId = this.relativePath.split('/')[1];
        break;
      case this.relativePath.startsWith('create'):
        element = 'create';
        break;
      case this.relativePath.startsWith('delete'):
        element = 'delete';
        entryId = this.relativePath.split('/')[1];
        break;
      default:
        break;
    }

    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        { element === "create" ? <cernica-department-create api-base={this.apiBase}></cernica-department-create>
        : element === "edit" 
        ? <cernica-department-edit entry-id={entryId} apiBase={this.apiBase}
            oneditor-closed={ () => navigate("./list")} >
          </cernica-department-edit>
        : <cernica-department-list onEdit={ (ev) => navigate(`./edit/${ev.detail}`)} api-base={this.apiBase} onCreate={() => navigate('./create')}> </cernica-department-list>
        }
      </Host>
    );
  }

}

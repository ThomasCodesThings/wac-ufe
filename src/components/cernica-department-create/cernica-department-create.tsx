import { Component, Host, State, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'cernica-department-create',
  styleUrl: 'cernica-department-create.css',
  shadow: true,
})
export class CernicaDepartmentCreate {
  @State() firstName: string = '';
  @State() lastName: string = '';
  @State() department: string = '';
  @State() scheduledDate: string = '';
  @State() duration: string = '';

  @Event({eventName: "create-closed"}) createClosed: EventEmitter<string>;

  render() {
    return (
      <Host>
        <h2 class="title">Vytvorenie nového záznamu</h2>
      <md-filled-text-field label="Meno">
        <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Priezvisko">
        <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Oddelenie">
        <md-icon slot="leading-icon">home_health</md-icon>
      </md-filled-text-field>
      <input type="date" id="scheduledDate" name="scheduledDate"  />
      <md-outlined-select label="Trvanie (v minútach)">
        <md-icon slot="leading-icon">schedule</md-icon>
        <md-select-option value="15">15 minút</md-select-option>
        <md-select-option value="30">30 minút</md-select-option>
        <md-select-option value="45">45 minút</md-select-option>
        <md-select-option value="60">1 hodina</md-select-option>
        <md-select-option value="120">2 hodiny</md-select-option>
      </md-outlined-select>
      <md-divider></md-divider>
       <div class="actions">
         <md-filled-button id="confirm"
           onClick={() => this.createClosed.emit("store")}>
           <md-icon slot="icon">save</md-icon>
           Uložiť
         </md-filled-button>
       </div>
    </Host>
    );
  }

}

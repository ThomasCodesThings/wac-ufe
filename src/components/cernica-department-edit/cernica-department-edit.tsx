import { Component, Host, Prop, State, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'cernica-department-edit',
  styleUrl: 'cernica-department-edit.css',
  shadow: true,
})
export class CernicaDepartmentEdit {

  @State() firstName: string = '';
  @State() lastName: string = '';
  @State() department: string = '';
  @State() scheduledDate: string = '';
  @State() duration: string = '';

  @Prop() entryId: string;

  @Event({eventName: "edit-closed"}) editClosed: EventEmitter<string>;

  handleFirstNameChange = (event: Event) => {
    this.firstName = (event.target as HTMLInputElement).value;
  };

  handleLastNameChange = (event: Event) => {
    this.lastName = (event.target as HTMLInputElement).value;
  };

  handleDepartmentChange = (event: Event) => {
    this.department = (event.target as HTMLInputElement).value;
  };

  handleScheduledDateChange = (event: Event) => {
    this.scheduledDate = (event.target as HTMLInputElement).value;
  };

  handleDurationChange = (event: Event) => {
    this.duration = (event.target as HTMLInputElement).value;
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send data to server
    console.log('Form submitted with data:', {
      firstName: this.firstName,
      lastName: this.lastName,
      department: this.department,
      scheduledDate: this.scheduledDate,
      duration: this.duration,
    });
  };

  render() {
    return (
      <Host>
        <h2 class="title">Editácia záznamu {this.entryId}</h2>
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
         <md-filled-tonal-button id="delete"
           onClick={() => this.editClosed.emit("delete")}>
           <md-icon slot="icon">delete</md-icon>
           Zmazať
         </md-filled-tonal-button>
         <md-filled-button id="confirm"
           onClick={() => this.editClosed.emit("store")}>
           <md-icon slot="icon">save</md-icon>
           Uložiť
         </md-filled-button>
       </div>
    </Host>
    )}
}

import { Component, Host, State, h, EventEmitter, Event, Prop } from '@stencil/core';

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

  @Prop() apiBase: string;

  @State() departments = [];
  @State() connectionOK = true;
  @State() createdOk = false;

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

  private async getDepartments() {
    try {
      const response = await fetch(`${this.apiBase}/departments`);
      this.connectionOK = response.ok
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.departments = await response.json();
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  }

  async componentWillLoad() {
    await this.getDepartments();
  }

  handleSubmit = async () => {
    const data = new URLSearchParams();
    data.append('firstname', this.firstName);
    data.append('lastname', this.lastName);
    data.append('department', this.department);
    data.append('appointmentDate', this.scheduledDate);
    data.append('duration', this.duration);

    try {
      const response = await fetch(`${this.apiBase}/operations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //this.createClosed.emit('');
      this.createdOk = true;
    } catch (error) {
      console.error('Failed to create operation:', error);
    }
  }

  @Event({eventName: "create-closed"}) createClosed: EventEmitter<string>;

  render() {
    if (!this.connectionOK) {
      return (
        <Host>
          <h1 style={{ color: 'red', fontSize: '48px' }}>{`Failed to connect to the server: ${this.apiBase}`}</h1>
        </Host>
      );
    }
    return (
      <Host>
      <h2 class="title">Vytvorenie nového záznamu</h2>
      <md-filled-text-field label="Meno" value={this.firstName} onInput={this.handleFirstNameChange}>
      <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Priezvisko" value={this.lastName} onInput={this.handleLastNameChange}>
      <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-outlined-select label="Oddelenie" onInput={this.handleDepartmentChange}>
      <md-icon slot="leading-icon">home_health</md-icon>
      {this.departments.map((department) => (
        <md-select-option value={department.name}>{department.name}</md-select-option>
      ))}
      </md-outlined-select>
      <input type="date" id="scheduledDate" name="scheduledDate"/>
      <md-outlined-select label="Trvanie" value={this.duration.toString()} onInput={this.handleDurationChange}>
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
        onClick={this.handleSubmit}>
        <md-icon slot="icon">save</md-icon>
        Uložiť
      </md-filled-button>
      </div>
      {this.createdOk && <h2 style={{ color: 'green', fontSize: '48px' }}>Záznam bol úspešne vytvorený</h2>}
      </Host>
    );
  }

}

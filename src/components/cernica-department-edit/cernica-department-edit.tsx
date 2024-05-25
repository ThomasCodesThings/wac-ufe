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
  @Prop() apiBase: string;
  @State() editedOk = false;

  @Event({eventName: "edit-closed"}) editClosed: EventEmitter<string>;

  @State() departments = [];

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

  private async fetchOperation() {
    try {
      const response = await fetch(`${this.apiBase}/operations/${this.entryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const operation = await response.json();
      this.firstName = operation.firstname;
      this.lastName = operation.surname;
      this.department = operation.department;
      this.scheduledDate = operation.appointmentDate;
      this.duration = operation.duration;
    } catch (error) {
      console.error('Failed to fetch operation:', error);
    }
  }

  private async getDepartments() {
    try {
      const response = await fetch(`${this.apiBase}/departments`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.departments = await response.json();
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  }

  async componentWillLoad() {
    if (this.entryId !== "@new")
      await this.fetchOperation();
    await this.getDepartments();
  }

  private findDepartment(name: string) {
    let index = this.departments.findIndex((department) => department.name === name);
    if (index === -1) {
      return '';
    }
    return this.departments[index].name
  }

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    // You can handle form submission here, e.g., send data to server
    console.log('Form submitted with data:', {
      firstName: this.firstName,
      lastName: this.lastName,
      department: this.department,
      scheduledDate: this.scheduledDate,
      duration: this.duration,
    });

    const data = new URLSearchParams();
    data.append('firstname', this.firstName);
    data.append('lastname', this.lastName);
    data.append('department', this.department);
    data.append('appointmentDate', this.scheduledDate);
    data.append('duration', this.duration);

    if (this.entryId === "@new") {
      try {
        const response = await fetch(`${this.apiBase}/operations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data.toString(),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.editClosed.emit("create");
      } catch (error) {
        console.error('Failed to create operation:', error);
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/operations/${this.entryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data.toString(),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.editedOk = true;
        //this.editClosed.emit("update");
      } catch (error) {
        console.error('Failed to update operation:', error);
      }
    }
  }

  render() {
    return (
      <Host>
        <h2 class="title">Editácia záznamu {this.entryId}</h2>
      <md-filled-text-field label="Meno" value={this.firstName} onInput={this.handleFirstNameChange}>
        <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Priezvisko" value={this.lastName} onInput={this.handleLastNameChange}>
        <md-icon slot="leading-icon">person</md-icon>
      </md-filled-text-field>
      <md-outlined-select label="Oddelenie" value={this.findDepartment(this.department)} onInput={this.handleDepartmentChange}>
        <md-icon slot="leading-icon">home_health</md-icon>
        {this.departments.map((department) => (
          <md-select-option value={department.name}>{department.name}</md-select-option>
        ))}
        </md-outlined-select>
      <input type="date" id="scheduledDate" name="scheduledDate" onInput={this.handleScheduledDateChange}/>
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
       {this.editedOk && <h2 style={{ color: 'green', fontSize: '48px' }}>Záznam bol úspešne upravený</h2>}
    </Host>
    )}
}

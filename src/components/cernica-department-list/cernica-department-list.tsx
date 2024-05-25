import { Component, Event, EventEmitter, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'cernica-department-list',
  styleUrl: 'cernica-department-list.css',
  shadow: true,
})
export class CernicaDepartmentList {
  @Event({ eventName: "edit" }) editClicked: EventEmitter<string>;
  @Event({ eventName: "delete" }) deleteClicked: EventEmitter<string>;
  @Event({ eventName: "create" }) createClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  
  @State() operations: any[] = [];
  @State() departments: any[] = [];
  @State() connectionOK = true;
  @State() visible = false;
  @State() newDepartmentName = '';

  private async fetchOperations() {
    try {
      const response = await fetch(`${this.apiBase}/operations`);
      this.connectionOK = response.ok;
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const operations = await response.json();
      return operations;
    } catch (error) {
      console.error('Failed to fetch operations:', error);
      this.connectionOK = false;
      return [];
    }
  }

  private async fetchDepartments() {
    try {
      const response = await fetch(`${this.apiBase}/departments`);
      this.connectionOK = response.ok;
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const departments = await response.json();
      return departments;
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      this.connectionOK = false;
      return [];
    }
  }

  private async deleteDepartment(departmentId: string) {
    try {
      const response = await fetch(`${this.apiBase}/departments/${departmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Re-fetch departments after deletion
      this.departments = await this.fetchDepartments();
    } catch (error) {
      console.error('Failed to delete department:', error);
    }
  }

  private async addDepartment() {
    const data = new URLSearchParams();
    data.append('name', this.newDepartmentName);
    try {
      const response = await fetch(`${this.apiBase}/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.newDepartmentName = '';
      this.visible = false;
    } catch (error) {
      console.error('Failed to add department:', error);
    }
  }

  private async deleteOperation(operationId: string) {
    try {
      const response = await fetch(`${this.apiBase}/operations/${operationId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Operation deleted');
      this.operations = await this.fetchOperations();
    } catch (error) {
      console.error('Failed to delete operation:', error);
    }
  }

  async componentWillLoad() {
    this.operations = await this.fetchOperations();
    this.departments = await this.fetchDepartments();
  }

  handleInputChange(event: Event) {
    this.newDepartmentName = (event.target as HTMLInputElement).value;
  }

  render() {
    return (
      <Host>
        {this.connectionOK ? (
          <div style={{display: "flex flex-row"}}>
            <span>
              <h2>Operations</h2>
              <md-filled-button onClick={() => this.createClicked.emit('')}>Create</md-filled-button>
            </span>
            <md-list>
              {this.operations?.length > 0 && this.operations.map((operation) => (
                <md-list-item>
                  <div slot="headline">{operation.firstname + " " + operation.surname}</div>
                  <md-icon slot="start">person</md-icon>
                  <div slot="supporting-text">{operation.department}</div>
                  <div slot="supporting-text">{operation.appointmentDate}</div>
                  <div slot="supporting-text">{operation.duration}</div>
                  <md-icon slot="end" onClick={() => this.editClicked.emit(operation.operationId.toString())}>edit</md-icon>
                  <md-icon slot="end" onClick={async() => await this.deleteOperation(operation.operationId)}>delete</md-icon>
                </md-list-item>
              ))}
            </md-list>
            <span>
              <h3>Departments</h3>
            </span>
            <md-list>
              {this.departments?.length > 0 && this.departments.map((department) => (
                <md-list-item>
                  <div slot="headline">{department.name}</div>
                  <md-icon slot="start">business</md-icon>
                  <md-icon slot="end" onClick={async () => await this.deleteDepartment(department.departmentId)}>delete</md-icon>
                </md-list-item>
              ))}
            </md-list>
            <md-filled-button onClick={() => this.visible = true}>Add department</md-filled-button>
            {this.visible && (
              <md-dialog class="custom-dialog">
                <md-dialog-content>
                  <md-filled-text-field label="Name" value={this.newDepartmentName} onInput={(event) => this.handleInputChange(event)}></md-filled-text-field>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-filled-button onClick={async() => {await this.addDepartment(); this.visible = false}}>Add</md-filled-button>
                </md-dialog-actions>
              </md-dialog>
            )}
          </div>
        ) : (
          <h1 style={{ color: 'red', fontSize: '48px' }}>{`Failed to connect to the server: ${this.apiBase}`}</h1>
        )}
      </Host>
    );
  }
}

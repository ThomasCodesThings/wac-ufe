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
  @Event({ eventName: "detail" }) departmentClicked: EventEmitter<{string}>;
  @Prop() apiBase: string;
  
  @State() operations: any[] = [];
  @State() departments: any[] = [];
  @State() connectionOK = true;
  @State() visible = false;
  @State() newDepartmentName = '';
  @State() pricePerHour = 0;

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
    data.append('pricePerHour', this.pricePerHour.toString());
    try {
      const response = await fetch(`${this.apiBase}/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data.toString()
      });
      if (!response.ok) {
        console.log(response);
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

  handlePricePerHourChange(event: Event) {
    this.pricePerHour = parseFloat((event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <Host>
        {this.connectionOK ? (
          <div style={{display: "flex flex-row"}}>
            <span>
              <h2>Zoznam úkonov</h2>
              <md-filled-button onClick={() => this.createClicked.emit('')}>Vytvoriť nový úkon</md-filled-button>
            </span>
            <div>
            <h2>Úkony</h2>
            {this.operations?.length > 0 ? (
              <div>
              <table>
                <thead>
                  <tr>
                    <th>Meno a priezvisko</th>
                    <th>Oddelenie</th>
                    <th>Dátum</th>
                    <th>Trvanie (v minútach)</th>
                    <th>Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {this.operations.map((operation) => (
                    <tr>
                      <td>{operation.firstname} {operation.surname}</td>
                      <td>{operation.department}</td>
                      <td>{operation.appointmentDate}</td>
                      <td>{operation.duration}</td>
                      <td class="actions">
                        <md-icon onClick={() => this.editClicked.emit(operation.operationId.toString())}>edit</md-icon>
                        <md-icon onClick={async () => await this.deleteOperation(operation.operationId)}>delete</md-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
      ) : (
        <h4>Neexistujú žiadne úkony</h4>
      )}
        </div>
            <span>
              <h3>Oddelenia</h3>
            </span>
            {this.departments?.length > 0 ? (
              <div>
              <table>
                <thead>
                  <tr>
                    <th>Názov oddelenia</th>
                    <th>Cena za hodinu (€)</th>
                    <th>Akcie</th>
                  </tr>
                </thead>

                <tbody>
                  {this.departments.map((department) => (
                    <tr>
                      <td>{department.name}</td>
                      <td>{department.pricePerHour}</td>
                      <td class="actions">
                        <md-icon onClick={async () => await this.deleteDepartment(department.departmentId)}>delete</md-icon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            ) : (
              <h4>Neexistujú žiadne oddelenia</h4>
            )}
            <md-filled-button onClick={() => this.visible = true}>Pridať oddelenie</md-filled-button>
            {this.visible && (
              <md-dialog class="custom-dialog">
                <md-dialog-content>
                  <md-filled-text-field label="Názov" value={this.newDepartmentName} onInput={(event) => this.handleInputChange(event)}></md-filled-text-field>
                  <md-filled-text-field type="number" label="Cena za hodinu práce (v €)" value={this.pricePerHour.toString()} onInput={(event) => this.handlePricePerHourChange(event)}></md-filled-text-field>
                </md-dialog-content>
                <md-dialog-actions>
                  <md-filled-button onClick={async() => {await this.addDepartment(); this.visible = false}}>Pridať</md-filled-button>
                  <md-filled-button onClick={() =>  this.visible = false}>Zrušiť</md-filled-button>
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

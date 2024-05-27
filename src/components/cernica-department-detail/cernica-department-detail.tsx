import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'cernica-department-detail',
  styleUrl: 'cernica-department-detail.css',
  shadow: true,
})
export class CernicaDepartmentDetails {
  @Prop() apiBase: string;
  @Prop() entryId: string;
  @State() connectionOK = false;
  @State() department: any = {};
  @State() operations: any[] = [];

  private async fetchDepartment() {
    console.log("URL:", `${this.apiBase}/departments/${this.entryId}`);
    console.log("method:", 'GET');
    try {
      const response = await fetch(`${this.apiBase}/departments/${this.entryId}`);
      this.connectionOK = response.ok;
      console.log("Response:", response);
      console.log("Response.ok:", response.ok);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.department = await response.json();
    } catch (error) {
      console.error('Failed to fetch department:', error);
    }
  }

  private async fetchOperations() {
    console.log("URL:", `${this.apiBase}/departments/${this.entryId}/operations`);
    console.log("method:", 'GET');
    try {
      const response = await fetch(`${this.apiBase}/departments/${this.entryId}/operations`);
      this.connectionOK = response.ok;
      console.log("Response:", response);
      console.log("Response.ok:", response.ok);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.operations = await response.json();
    } catch (error) {
      console.error('Failed to fetch operations:', error);
    }
  }

  async componentWillLoad() {
    await this.fetchDepartment();
    await this.fetchOperations();
  }

  render() {
    return (
      <Host>
        <h1>Oddelenie {this.department.name}</h1>
        <p>Id: {this.department.departmentId}</p>
        <p>Cena za hodinu: {this.department.pricePerHour} €</p>
        { this.operations.length > 0 ? (
        <div>
        <h2>Úkony</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Meno</th>
              <th>Priezvisko</th>
              <th>Oddelenie</th>
              <th>Dátum</th>
              <th>Trvanie (v minútach)</th>
              <th>Cena za úkon (€)</th>
            </tr>
          </thead>
          <tbody>
            {this.operations.map((operation) => (
              <tr>
                <td>{operation.operationId}</td>
                <td>{operation.firstname}</td>
                <td>{operation.surname}</td>
                <td>{operation.department}</td>
                <td>{operation.appointmentDate}</td>
                <td>{operation.duration}</td>
                <td>{(operation.duration / 60 ) * this.department.pricePerHour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <h4>Spolu {this.operations.length} úkonov v celkovej výške {this.operations.reduce((acc, operation) => acc + (operation.duration / 60 ) * this.department.pricePerHour, 0)} €</h4>
      </div>
        ) : (
          <p>Žiadne operácie</p>
        )}
      </Host>
    );
  }

}

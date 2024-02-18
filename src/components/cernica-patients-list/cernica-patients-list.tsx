import { Component, Host, h } from '@stencil/core';
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'


@Component({
  tag: 'cernica-patients-list',
  styleUrl: 'cernica-patients-list.css',
  shadow: true,
})
export class CernicaPatientsList {

  patients: any[];
  generateOnce: boolean = false;

  private async generatePatients(number_of_patients: number) {
    const possible_first_names = ['John', 'Jane', 'Doe', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Jack', 'Karl', 'Lara', 'Mona', 'Nina', 'Oscar', 'Paul', 'Quincy', 'Rita', 'Steve', 'Tina', 'Ursula', 'Victor', 'Wendy', 'Xander', 'Yvonne', 'Zack'];
    const possible_last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes'];
    const patients = [];

    for (let i = 0; i < number_of_patients; i++) {
        const first_name = possible_first_names[Math.floor(Math.random() * possible_first_names.length)];
        const last_name = possible_last_names[Math.floor(Math.random() * possible_last_names.length)];

        // Generate random age between 2 and 90
        const age = Math.floor(Math.random() * 89) + 2;

        patients.push({ first_name: first_name, last_name: last_name, age: age });

    }

    return await Promise.resolve(patients);
}

  async componentWillLoad() {
    if (!this.generateOnce) {
      this.patients = await this.generatePatients(10);
      this.generateOnce = true;
    }
  }


  render() {
    return (
      <Host>
        <h2>Patients</h2>
        <md-list>
          {this.patients.map((patient) => (
            <md-list-item>
              <div slot="headline">{patient.first_name + " " + patient.last_name}</div>
              <div slot="supporting-text">{patient.age + " years old"}</div>
              <md-icon slot="start">person</md-icon>
            </md-list-item>
          ))}
        </md-list>
      </Host>
    );
  }

}

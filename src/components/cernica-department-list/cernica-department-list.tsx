import { Component, Event, EventEmitter,  Host, h } from '@stencil/core';

@Component({
  tag: 'cernica-department-list',
  styleUrl: 'cernica-department-list.css',
  shadow: true,
})
export class CernicaDepartmentList {
  @Event({eventName: "edit"}) editClicked: EventEmitter<string>;
  @Event({eventName: "delete"}) deleteClicked: EventEmitter<string>;
  patients: any[];
  generateOnce: boolean = false;

  private async generatePatients(number_of_patients: number) {
    const patients = [];

    for (let i = 0; i < number_of_patients; i++) {
      patients.push({
        id: i,
        first_name: 'John',
        last_name: 'Decker',
        department: 'Cardiology',
        scheduled_date: '2020-12-24',
        duration: '60'
      });
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
              <md-icon slot="start">person</md-icon>
              <div slot="supporting-text">{patient.department}</div>
              <div slot="supporting-text">{patient.scheduled_date}</div>
              <div slot="supporting-text">{patient.duration}</div>
              <md-icon slot="end" onClick={() => this.editClicked.emit(patient.id.toString())}>edit</md-icon>
              <md-icon slot="end" onClick={() => this.deleteClicked.emit(patient.id.toString())}>delete</md-icon>
            </md-list-item>
          ))}
        </md-list>
      </Host>
    );
  }

}

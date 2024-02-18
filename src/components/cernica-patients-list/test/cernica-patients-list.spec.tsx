import { newSpecPage } from '@stencil/core/testing';
import { CernicaPatientsList } from '../cernica-patients-list';

describe('cernica-patients-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaPatientsList],
      html: `<cernica-patients-list></cernica-patients-list>`,
    });

    const list = page.rootInstance as CernicaPatientsList;
    const expectedPatients = list.patients.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(expectedPatients);
  });
});

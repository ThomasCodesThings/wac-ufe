import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentList } from '../cernica-department-list';

describe('cernica-department-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentList],
      html: `<cernica-department-list></cernica-department-list>`,
    });

    const list = page.rootInstance as CernicaDepartmentList;
    const expecteddepartment = list.patients.length;

    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    expect(items.length).toEqual(expecteddepartment);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CernicaPatientsList } from '../cernica-patients-list';

describe('cernica-patients-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaPatientsList],
      html: `<cernica-patients-list></cernica-patients-list>`,
    });
    expect(page.root).toEqualHtml(`
      <cernica-patients-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cernica-patients-list>
    `);
  });
});

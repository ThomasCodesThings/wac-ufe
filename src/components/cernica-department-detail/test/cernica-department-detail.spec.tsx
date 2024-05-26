import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentDetails } from '../cernica-department-detail';

describe('cernica-department-detail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentDetails],
      html: `<cernica-department-detail></cernica-department-detail>`,
    });
    expect(page.root).toEqualHtml(`
      <cernica-department-detail>
        <mock:shadow-root>
        <h1>Oddelenie</h1><p>Id:</p>
        <p>Cena za hodinu: €</p>
        <p>Žiadne operácie</p>
        </mock:shadow-root>
      </cernica-department-detail>
    `);
  });
});

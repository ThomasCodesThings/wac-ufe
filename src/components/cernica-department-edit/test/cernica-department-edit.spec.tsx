import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentEdit } from '../cernica-department-edit';

describe('cernica-department-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentEdit],
      html: `<cernica-department-edit></cernica-department-edit>`,
    });
    expect(page.root).toEqualHtml(`
      <cernica-department-edit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cernica-department-edit>
    `);
  });
});

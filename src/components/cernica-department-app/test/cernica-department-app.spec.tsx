import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentApp } from '../cernica-department-app';

describe('cernica-department-app', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentApp],
      html: `<cernica-department-app></cernica-department-app>`,
    });
    expect(page.root).toEqualHtml(`
      <cernica-department-app>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cernica-department-app>
    `);
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-create', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-create></cernica-department-create>');

    const element = await page.find('cernica-department-create');
    expect(element).toHaveClass('hydrated');
  });
});

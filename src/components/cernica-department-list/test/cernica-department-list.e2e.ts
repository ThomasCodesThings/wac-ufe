import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-list></cernica-department-list>');

    const element = await page.find('cernica-department-list');
    expect(element).toHaveClass('hydrated');
  });
});

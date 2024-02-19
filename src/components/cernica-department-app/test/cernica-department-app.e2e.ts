import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-app></cernica-department-app>');

    const element = await page.find('cernica-department-app');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cernica-patients-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-patients-list></cernica-patients-list>');

    const element = await page.find('cernica-patients-list');
    expect(element).toHaveClass('hydrated');
  });
});

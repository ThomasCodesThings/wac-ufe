import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-detail></cernica-department-detail>');

    const element = await page.find('cernica-department-detail');
    expect(element).toHaveClass('hydrated');
  });
});

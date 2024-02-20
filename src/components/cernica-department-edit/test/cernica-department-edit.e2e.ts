import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-edit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-edit></cernica-department-edit>');

    const element = await page.find('cernica-department-edit');
    expect(element).toHaveClass('hydrated');
  });
});

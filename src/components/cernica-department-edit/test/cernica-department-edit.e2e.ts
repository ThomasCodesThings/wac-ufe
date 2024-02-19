import { newE2EPage } from '@stencil/core/testing';

describe('cernica-department-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cernica-department-editor></cernica-department-editor>');

    const element = await page.find('cernica-department-editor');
    expect(element).toHaveClass('hydrated');
  });
});

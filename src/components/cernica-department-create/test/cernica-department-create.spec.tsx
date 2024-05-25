import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentCreate } from '../cernica-department-create';

describe('cernica-department-create', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentCreate],
      html: `<cernica-department-create></cernica-department-create>`,
    });
    expect(page.root).toEqualHtml(`
      <cernica-department-create>
        <mock:shadow-root>
        <h2 class="title">Vytvorenie nového záznamu</h2>
        <md-filled-text-field label="Meno" value="">
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>
        <md-filled-text-field label="Priezvisko" value="">
          <md-icon slot="leading-icon">person</md-icon>
        </md-filled-text-field>
        <md-outlined-select label="Oddelenie">
          <md-icon slot="leading-icon">home_health</md-icon>
        </md-outlined-select>
        <input type="date" id="scheduledDate" name="scheduledDate"  />
        <md-outlined-select label="Trvanie" value="">
          <md-icon slot="leading-icon">schedule</md-icon>
          <md-select-option value="15">15 minút</md-select-option>
          <md-select-option value="30">30 minút</md-select-option>
          <md-select-option value="45">45 minút</md-select-option>
          <md-select-option value="60">1 hodina</md-select-option>
          <md-select-option value="120">2 hodiny</md-select-option>
        </md-outlined-select>
        <md-divider></md-divider>
         <div class="actions">
           <md-filled-button id="confirm">
             <md-icon slot="icon">save</md-icon>
             Uložiť
           </md-filled-button>
         </div>
        </mock:shadow-root>
      </cernica-department-create>
    `);
  });
});

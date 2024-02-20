import { newSpecPage } from '@stencil/core/testing';
import { CernicaDepartmentEdit } from '../cernica-department-edit';

describe('cernica-department-edit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CernicaDepartmentEdit],
      html: `<cernica-department-edit></cernica-department-edit>`,
    });

    expect (page.root).toEqualHtml(`
      <cernica-department-edit>
        <mock:shadow-root>
        <h2 class="title">
        Editácia záznamu
      </h2>
      <md-filled-text-field label="Meno">
        <md-icon slot="leading-icon">
         person
       </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Priezvisko">
        <md-icon slot="leading-icon">
          person
        </md-icon>
      </md-filled-text-field>
      <md-filled-text-field label="Oddelenie">
        <md-icon slot="leading-icon">
          home_health
        </md-icon>
      </md-filled-text-field>
     <input id="scheduledDate" name="scheduledDate" type="date">
<md-outlined-select label="Trvanie (v minútach)">
        <md-icon slot="leading-icon">
          schedule
        </md-icon>
        <md-select-option value="15">
          15 minút
        </md-select-option>
        <md-select-option value="30">
          30 minút
        </md-select-option>
        <md-select-option value="45">
          45 minút
        </md-select-option>
        <md-select-option value="60">
          1 hodina
        </md-select-option>
        <md-select-option value="120">
2 hodiny
        </md-select-option>
      </md-outlined-select>
      <md-divider></md-divider>
      <div class="actions">
        <md-filled-tonal-button id="delete">
         <md-icon slot="icon">
            delete
          </md-icon>
          Zmazať
        </md-filled-tonal-button>
        <span class="stretch-fill"></span>
        <md-outlined-button id="cancel">
          Zrušiť
        </md-outlined-button>
        <md-filled-button id="confirm">
          <md-icon slot="icon">
            save
         </md-icon>
         Uložiť
       </md-filled-button>
</div>
        </mock:shadow-root>
      </cernica-department-edit>
    `);
  });
});

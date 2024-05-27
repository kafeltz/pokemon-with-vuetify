import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import LabelType from './LabelType.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('Renderizar o componente corretamente', () => {
  const wrapper = mount({
    template: '<v-layout><LabelType type="grass" /></v-layout>'
  }, {
    props: { type: 'grass' },
    global: {
      components: {
        LabelType,
      },
      plugins: [vuetify],
    }
  });

  expect(wrapper.html()).toContain('pokemon-icon')
})

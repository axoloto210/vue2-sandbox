import Vue from 'vue'
import Component from 'vue-class-component'

// ---- Vue.extend による書き方 ----
const ProfileExtend = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data() {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg',
    }
  },
})

// ---- vue-class-component による書き方 ----
@Component({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>'
})
class ProfileClass extends Vue {
  firstName = 'Walter'
  lastName = 'White'
  alias = 'Heisenberg'
}

// ---- App ----
@Component
export default class App extends Vue {
  mounted() {
    new ProfileExtend().$mount('#mount-point-extend')
    new ProfileClass().$mount('#mount-point-class')
  }
}

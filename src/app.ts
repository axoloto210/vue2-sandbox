import Vue from "vue";
import Component from "vue-class-component";

// ---- Vue.extend による書き方 ----
// Vue.extendがないとthisの型推論がされない。
const ProfileExtend = Vue.extend({
  template: `
  <div>
  <p>{{firstName}} {{lastName}} aka {{alias}}</p>
  <ol>
      <!-- Reactのkeyのようにv-forでは:keyの指定が推奨されている。 -->
      <li v-for="todo in todos" :key="todo.text">
        {{todo.text}}
      </li>
  </ol>
  </div>`,
  data() {
    return {
      firstName: "Walter",
      lastName: "White",
      alias: "Heisenberg",
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Build something awesome" },
      ],
    };
  },
});

// ---- vue-class-component による書き方 ----
@Component({
  template: "<p>{{firstName}} {{lastName}} aka {{alias}}</p>",
})
class ProfileClass extends Vue {
  firstName = "Walter";
  lastName = "White";
  alias = "Heisenberg";
}

// ---- App ----
@Component
export default class App extends Vue {
  mounted() {
    new ProfileExtend().$mount("#mount-point-extend");
    new ProfileClass().$mount("#mount-point-class");
  }
}

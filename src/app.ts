import Vue from "vue";
import Component from "vue-class-component";

// ---- Vue.extend による書き方 ----
// Vue.extendがないとthisの型推論がされない。
const ProfileExtend = Vue.extend({
  template: `
  <div>
  <p>{{firstName}} {{lastName}} aka {{alias}}</p>
  <button @click="reverseTodos">順序を逆にする</button>
  <ol>
      <!-- Reactのkeyのようにv-forでは:keyの指定が推奨されている。 -->
      <li v-for="todo in todos" :key="todo.text">
        {{todo.text}}
      </li>
  </ol>
  </div>`,
  data(): {
    firstName: string;
    lastName: string;
    alias: string;
    todos: { text: string }[];
  } {
    return {
      firstName: "Walter", //型注釈はdata()の返り値オブジェクトの形式でないと書けない。
      lastName: "White",
      alias: "Heisenberg",
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Build something awesome" },
      ],
    };
  },
  methods: {
    reverseTodos() {
      this.todos.reverse();
    },
  },
});

// ---- vue-class-component による書き方 ----
// @Component は、templateとクラスを結びつけている。@Componentなどの書き方はデコレータと呼ばれ、直後のクラスに適用される。
@Component({
  template: ` <div>
    <p>{{ firstName }} {{ lastName }} aka {{ alias }}</p>
    <button @click="reverseTodos">順序を逆にする</button>
    <ol>
      <li v-for="todo in todos" :key="todo.text">
        {{ todo.text }}
      </li>
    </ol>
  </div>`,
})
class ProfileClass extends Vue {
  firstName: "Walter" = "Walter"; //classベースだと型注釈を書くことができる。
  lastName = "White";
  alias = "Heisenberg";
  todos = [
    { text: "Learn JavaScript" },
    { text: "Learn Vue" },
    { text: "Build something awesome" },
  ];

  reverseTodos() {
    //methods() も不要になっている。
    this.todos.reverse();
  }
}

// ---- App ----
// export defaultされたクラスなので、templateは自動でApp.vueのtemplateに結びつく。
@Component
export default class App extends Vue {
  mounted() {
    new ProfileExtend().$mount("#mount-point-extend");
    new ProfileClass().$mount("#mount-point-class");
  }
}

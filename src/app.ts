import Vue from "vue";

var Profile = Vue.extend({
  template: "<p>{{firstName}} {{lastName}} aka {{alias}}</p>",
  data: function () {
    return {
      firstName: "Walter",
      lastName: "White",
      alias: "Heisenberg",
    };
  },
});

export default Vue.extend({
  name: "App",
  //マウント後に実行。
  mounted() {
    // Profile のインスタンスを作成して、要素上にマウントする
    new Profile().$mount("#mount-point");
  },
});
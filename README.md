## Vue2 Sandbox
https://v2.ja.vuejs.org/

### Vue.extend
>Vue.extend( options )
>引数:
>
>{Object} options
>使用方法:
>
>Vue コンストラクタベースの “サブクラス” を作成します。引数はコンポーネントオプションを含むオブジェクトにする必要があります。
>
>ここでの注意すべき特別なケースは、data オプションは、これらは Vue.extend() で使用されるとき、関数にしなければなりません。
>```vue
><div id="mount-point"></div>
>```
>
>```js
>// 再利用可能なコンストラクタを作成
>var Profile = Vue.extend({
>  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
>  data: function () {
>    return {
>      firstName: 'Walter',
>      lastName: 'White',
>      alias: 'Heisenberg'
>    }
>  }
>})
>```
>// Profile のインスタンスを作成して、要素上にマウントする
>```vue
>new Profile().$mount('#mount-point')
>```
>結果は以下のようになります:
>
><p>Walter White aka Heisenberg</p>


### vue-property-decorator
vue-property-decoratorはvue-class-componentに完全に依存しているライブラリで、`@Props`など追加のデコレーターを使用できるようにするライブラリ。
`@Component`デコレータは`vue-class-component`のもの。

`Vue`を`vue-property-decorator`からimportして継承することで使用できるようになる。
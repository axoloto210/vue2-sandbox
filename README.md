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

### vue-class-component
https://class-component.vuejs.org/

Classコンポーネントを簡潔にかけるようにするライブラリ。
`@Component`デコレーターを使って、クラスを記述することで、`data()`の返り値をクラスのプロパティ、`method()`の返り値をクラスのメソッドとして扱うことができるようになる。
このため、TypeScriptで型を返り値の形式でないとつけられなかった部分にも自然に型注釈をつけられるようになる。
```ts
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
```

```ts
class ProfileClass extends Vue {
  firstName: "Walter" = "Walter"; //classベースだと型注釈を書くことができる。
  lastName = "White";
  alias = "Heisenberg";
  todos = [
    { text: "Learn JavaScript" },
    { text: "Learn Vue" },
    { text: "Build something awesome" },
  ];
}
```

#### `extends`と`mixins`
`extends`は単一クラスの継承に使用される。jsに元からある機能。
一方で`mixins`は複数のクラスコンポーネントを継承するのに使われる。
```js
@Component
export class HelloWorld extends mixins(Hello, World) {}
```
のように使用でき、同名プロパティが引数のクラスコンポーネントに含まれるときには、先に渡された（引数の左側）クラスコンポーネントが優先される。
hooksの実行については両方実行される。
同名プロパティの使用は避ける方が良い。

#### Caveats of Class Component
https://class-component.vuejs.org/guide/caveats.html#this-value-in-property-initializer

クラスプロパティとしてアロー関数を定義し、`this`にアクセスしても、プロキシオブジェクトを指してしまってうまく値を更新できない。

>通常のメソッド → this は呼び出し時に決まる
>アロー関数 → this は定義時に静的に束縛される
>
>Vue は内部で、クラスのメソッドを Vue インスタンスに正しくバインドし直す処理を行います。
>しかしアロー関数はそのバインドし直しを受け付けないため、初期化中の不完全な this（プロキシオブジェクト）が固定されたままになります。

`this`は同じものを指すものの、差し替えができないために不具合が起こる。

>「this は同じものを指すが、差し替えができない」は妥当です
>ソースコードを見ると、vue-class-component は内部でこういう処理をしています：
>```js
>// this（プロキシオブジェクト）の各キーを、vm（本物のVueインスタンス）へ転送する
>keys.forEach(key => {
>  Object.defineProperty(this, key, {
>    get: () => vm[key],
>    set: value => { vm[key] = value }, // ← vm に書き込む
>    configurable: true
>  })
>})
>```
>
>// クラスプロパティを収集するためにコンストラクタを実行
>`const data = new Component()`
>つまり：
>
>`this`（プロキシ）は vm（本物の Vue インスタンス）へ get/set を転送するラッパー
>`this.foo = 456` と書けば、プロキシ経由で `vm.foo = 456` に届く → 正しく動く
>しかしアロー関数は `this`（プロキシ）を束縛して固定するため、後から `this` を本物の vm に差し替えられない
>アロー関数が呼ばれる頃には `new Component()` は終わっており、プロキシオブジェクト自体はすでに捨てられた状態
>
>なので「同じものを指しているが差し替えができない」という表現は、この仕組みを正確に捉えていると言えます。

`constructor`についても使用してはいけない。
内部実装により2度呼ばれてしまうため、代わりに`created()`を使用する必要がある。
# vue-connection-aware

_⚠️ Disclaimer: this is an Alpha version, so be careful when using this on a Production environment._

Serve the right content to your users based on their connectivity. Vue-connection-aware uses the power of the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) under the hood, conveniently exposing its funcionality as a Vue component.

If you want to read more about the Network Information API, I recommend you this article: [Dynamic resources using the Network Information API and service workers](https://deanhume.com/dynamic-resources-using-the-network-information-api-and-service-workers/).

## 📦 Setup 

### Installing the package

To install the package, use:
```
yarn add vue-connection-aware
```
or
```
npm install vue-connection-aware
```

### Adding it to your Vue application

Add it globally:
```
import ConnectionAware from 'vue-connection-aware';

Vue.use(ConnectionAware);
```

or import it directly into your component:

```
import ConnectionAware from 'vue-connection-aware';

export default {
  name: "YourComponent",
  components: {
    ConnectionAware
  }
};
```

## ⌨️ Usage

Wrap the DOM element you want to render for a specific effective connection type with the component markup:

```
<connection-aware fast>
  <img src="url to quite a heavy gif" crossorigin="anonymous" />
</connection-aware>
```

## ⚙️ Options

You can pass different props to choose when you want to render the component and when not to, and how you want it to behave.

| Name       | Type      | Required | Default | Description                                                                                                                                                     |
|------------|-----------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fast`     | `Boolean` | `false`  | `false` | Render the component when the effective type is `4g`                                                                                                            |
| `medium`   | `Boolean` | `false`  | `false` | Render the component when the effective type is `3g`                                                                                                            |
| `slow`     | `Boolean` | `false`  | `false` | Render the component when the effective type is `2g` or `slow-2g`                                                                                               |
| `reactive` | `Boolean` | `false`  | `true`  | The component reacts to changes in the connection (e.g. if a component was initially rendered with a `4g` connection, hide it if the connection drops to `3g`)  |

## 🧪 Common examples

Load and render a heavy image only when on a fast connection (`4g`):
```
<connection-aware fast>
  <img src="url to quite a heavy gif" crossorigin="anonymous" />
</connection-aware>
```

Show a div when on a medium or fast connection (`3g` or `4g`):
```
<connection-aware medium fast>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat, velit sit amet dapibus finibus, sapien nunc commodo risus, eget luctus tortor eros eu risus. Phasellus molestie tincidunt est ac egestas</div>
</connection-aware>
```

Warn the user their connection is slow (`2g` or `slow-2g`):
```
<connection-aware slow>
  <div>Oops! Your connection seems to be quite slow at the moment.</div>
</connection-aware>
```

Show a div when on a medium or fast connection (`3g` or `4g`) but don't destroy it if the connection slows down (to `2g` or `slow-2g`):

```
<connection-aware medium fast v-bind:reactive="false">
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat, velit sit amet dapibus finibus, sapien nunc commodo risus, eget luctus tortor eros eu risus. Phasellus molestie tincidunt est ac egestas</div>
</connection-aware>
```

## Contributing

See [CONTRIBUTING.md](https://github.com/SachaZvetelman/vue-connection-aware/blob/master/CONTRIBUTING.md)

## Influences

The articles below significantly helped me, so I wanted to make sure they are recognised:
- Addy Osmani: [Adaptive Serving](https://addyosmani.com/blog/adaptive-serving/)
- Max Böck: [Connection-Aware Components](https://mxb.dev/blog/connection-aware-components/)
- Netanel Basal: [Connection-Aware Components in Angular](https://netbasal.com/connection-aware-components-in-angular-3a66bb0bab6f)


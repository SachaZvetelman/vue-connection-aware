# vue-connection-aware

![Version](https://img.shields.io/npm/v/vue-connection-aware.svg?style=flat&color=brightgreen)
![Downloads per week](https://img.shields.io/npm/dw/vue-connection-aware.svg)

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

// Using default options.
Vue.use(ConnectionAware); 

// Or specifying the different category thresholds.
Vue.use(ConnectionAware, {
  connectionCategoryThreshold: {
    slow: 2,
    medium: 6
  }
});
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

### Connection category thresholds

The default connection category thresholds, in Mbps, are:
```
slow: 1,
medium: 2,
fast: Number.MAX_SAFE_INTEGER
```

This means that any download speed up to 1 Mbps, will be considered as `slow`. Any connection above 1 Mbps up to 2 Mbps will be considered as `medium`. Anything above that will be `fast`. You can override these defaults by specifying the defaults when installing the component as a plugin.

Each web application will have different requirements, and that's why you can configure the different thresholds.

## ⌨️ Usage

Wrap the DOM element you want to render for a specific effective connection type with the component markup:

```
<connection-aware fast>
  <img src="url to quite a heavy gif" crossorigin="anonymous" />
</connection-aware>
```

## ⚙️ Options

You can pass different props to choose when you want to render the component and when not to, and how you want it to behave.

_Note: if no speed prop (i.e. `slow`, `medium` or `fast`) is specified, the component will render for all of them._

| Name       | Type      | Required | Default | Description                                                                                                                                                    |
| ---------- | --------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fast`     | `Boolean` | `false`  | `false` | Render the component when the download speed is greater than the `medium` connection threshold                                                                                                           |
| `medium`   | `Boolean` | `false`  | `false` | Render the component when the download speed is greater than the `slow` connection threshold and less than or equal to the `medium` connection threshold                                                                                                           |
| `slow`     | `Boolean` | `false`  | `false` | Render the component when the download speed is less than or equal to the `slow` connection threshold                                                                                              |
| `reactive` | `Boolean` | `false`  | `true`  | The component reacts to changes in the connection (e.g. if a component was initially rendered with a `fast` connection, hide it if the connection drops to `medium`) |
| `online` | `Boolean` | `false`  | `true`  | Render the component when its online status matches this property (e.g. if `false`, the component will render only when the browser is offline) |

## 🧪 Common examples

Load and render a heavy image only when on a fast connection:

```
<connection-aware fast>
  <img src="url to quite a heavy gif" crossorigin="anonymous" />
</connection-aware>
```

Show a div when on a medium or fast connection:

```
<connection-aware medium fast>
  <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat, velit sit amet dapibus finibus, sapien nunc commodo risus, eget luctus tortor eros eu risus. Phasellus molestie tincidunt est ac egestas</div>
</connection-aware>
```

Warn the user their connection is slow:

```
<connection-aware slow>
  <div>Oops! Your connection seems to be quite slow at the moment.</div>
</connection-aware>
```

Show a div when on a medium or fast connection but don't destroy it if the connection slows down:

```
<connection-aware medium fast :reactive="false">
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

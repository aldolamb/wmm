# react-atv-parallax
Port of [@drewwilson](https://github.com/drewwilson)’s [atvImg](https://github.com/drewwilson/atvImg) for React. It supports both touch and mouse events, and uses ReactDOM for layers. Example was assembled from [Designmodo](https://designmodo.com/apple-tv-effect/). 

## Install
`npm install --save react-atv-parallax`

## Demo
[http://danielsinclair.github.io/react-atv-parallax/](http://danielsinclair.github.io/react-atv-parallax/)

![GIF](doc/parallax-demo.gif)

Or run it locally:

```
git clone https://github.com/DanielSinclair/react-atv-parallax
cd react-atv-parallax
npm install
npm run dev
```

Then navigate to [http://localhost:3000/](http://localhost:3000/)

## API
### Props

``` javascript
static propTypes = {
  isStatic: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
};
```

`isStatic`: Optional. A boolean value. When it evaluates to `true`, it disables the parallax effect, and shows the flattened component.
`style`: Optional. Set up the width/height of the entire component.
`children`: Required. Equates the child dom elements as layers. Ordered: background to foreground.


### Example

``` javascript
import ATVParallax from 'react-atv-parallax';

<ATVParallax style={{ width: 320, height: 190 }}>
  <img src='img/1.png'/>
  <img src='img/2.png'/>
  <div style={{ ... }}>
    <span>Floating Title</span>
  </div>
</ATVParallax>
```

## License
MIT

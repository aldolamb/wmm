var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import React from 'react';

import style from './style.js';

export default createClass({
  propTypes: {
    isStatic: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.node
  },

  getInitialState: function getInitialState() {
    return {
      rootElemWidth: 0,
      rootElemHeight: 0,
      isOnHover: false,
      container: {},
      shine: {},
      layers: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.setState({
      // eslint-disable-line react/no-did-mount-set-state
      // this is a legit use case. we must trigger a re-render. don't worry.
      rootElemWidth: this.root.clientWidth || this.root.offsetWidth || this.root.scrollWidth,
      rootElemHeight: this.root.clientHeight || this.root.offsetHeight || this.root.scrollHeight
    });
  },
  handleMove: function handleMove(_ref) {
    var pageX = _ref.pageX,
        pageY = _ref.pageY;

    var allLayers = this.allLayers();
    var layerCount = allLayers ? this.allLayers.length : 0; // the number of layers

    var _state = this.state,
        rootElemWidth = _state.rootElemWidth,
        rootElemHeight = _state.rootElemHeight;


    var bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
    var bodyScrollLeft = document.body.scrollLeft;
    var offsets = this.root.getBoundingClientRect();
    var wMultiple = 320 / rootElemWidth;
    var offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth; // cursor position X
    var offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight; // cursor position Y
    var dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2; // center Y of container
    var dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2; // center X of container
    var yRotate = (offsetX - dx) * (0.07 * wMultiple); // rotation for container Y
    var xRotate = (dy - offsetY) * (0.1 * wMultiple); // rotation for container X

    var arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD

    var rawAngle = arad * 180 / Math.PI - 90; // convert rad to degrees
    var angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

    this.setState({
      container: {
        transform: 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)' + (this.state.isOnHover ? ' scale3d(1.07,1.07,1.07)' : '')
      },
      shine: {
        background: 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, ' + (pageY - offsets.top - bodyScrollTop) / rootElemHeight * 0.4 + ') 0%, rgba(255, 255, 255, 0) 80%)',
        transform: 'translateX(' + (offsetX * layerCount - 0.1) + 'px) translateY(' + (offsetY * layerCount - 0.1) + 'px)'
      },
      layers: allLayers.map(function (_, idx) {
        return {
          transform: 'translateX(' + offsetX * (layerCount - idx) * (idx * 2.5 / wMultiple) + 'px) translateY(' + offsetY * layerCount * (idx * 2.5 / wMultiple) + 'px)'
        };
      })
    });
  },
  handleTouchMove: function handleTouchMove(evt) {
    evt.preventDefault();
    var _evt$touches$ = evt.touches[0],
        pageX = _evt$touches$.pageX,
        pageY = _evt$touches$.pageY;

    this.handleMove({ pageX: pageX, pageY: pageY });
  },
  handleEnter: function handleEnter() {
    this.setState({ isOnHover: true });
  },
  handleLeave: function handleLeave() {
    this.setState({
      isOnHover: false,
      container: {},
      shine: {},
      layers: []
    });
  },
  handleStaticEvent: function handleStaticEvent() {
    // do nothing
  },
  allLayers: function allLayers() {
    var layers = [];
    if (_typeof(this.props.children) === 'object') {
      layers = this.props.children.constructor === Array ? layers.concat(this.props.children) : layers.concat([this.props.children]);
    }
    return layers;
  },
  renderShadow: function renderShadow() {
    return _jsx('div', {
      style: _extends({}, style.shadow, this.state.isOnHover ? style.shadowOnHover : {})
    });
  },
  renderLayers: function renderLayers() {
    var _this = this;

    var allLayers = this.allLayers();

    return _jsx('div', {
      style: style.layers
    }, void 0, allLayers && allLayers.map(function (layer, idx) {
      return React.Children.map(layer, function (child) {
        return React.cloneElement(child, {
          style: _extends({}, style.root, _this.props.style ? _this.props.style : {}, style.renderedLayer, _this.state.layers[idx] ? _this.state.layers[idx] : {}, child.props.style),
          key: idx
        });
      });
    }));
  },
  renderShine: function renderShine() {
    return _jsx('div', {
      style: _extends({}, style.shine, this.state.shine)
    });
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      {
        style: _extends({}, style.root, {
          transform: 'perspective(' + this.state.rootElemWidth * 3 + 'px)'
        }, this.props.style ? this.props.style : {}),
        onMouseMove: !this.props.isStatic ? this.handleMove : this.handleStaticEvent,
        onMouseEnter: !this.props.isStatic ? this.handleEnter : this.handleStaticEvent,
        onMouseLeave: !this.props.isStatic ? this.handleLeave : this.handleStaticEvent,
        onTouchMove: !this.props.isStatic ? this.handleTouchMove : this.handleStaticEvent,
        onTouchStart: !this.props.isStatic ? this.handleEnter : this.handleStaticEvent,
        onTouchEnd: !this.props.isStatic ? this.handleLeave : this.handleStaticEvent,
        ref: function ref(node) {
          return _this2.root = node;
        } },
      _jsx('div', {
        style: _extends({}, style.container, this.state.container)
      }, void 0, this.renderShadow(), this.renderLayers(), this.renderShine())
    );
  }
});
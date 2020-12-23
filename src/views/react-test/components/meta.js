'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meta = function (_React$Component) {
  _inherits(Meta, _React$Component);

  function Meta(props) {
    _classCallCheck(this, Meta);

    return _possibleConstructorReturn(this, (Meta.__proto__ || Object.getPrototypeOf(Meta)).call(this, props));
  }

  _createClass(Meta, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.data) {
        return React.createElement(
          "th",
          { colSpan: "2", className: "meta" },
          React.createElement(
            "h1",
            { onClick: function onClick() {
                return open(_this2.props.data.url);
              }, className: "name" },
            this.props.data.name
          ),
          React.createElement("img", { height: "25px", className: "country", src: "https://www.countryflags.io/" + this.props.data.country_iso2 + "/flat/64.png" }),
          React.createElement(
            "h2",
            { className: "wca_id" },
            this.props.data.wca_id
          ),
          React.createElement("img", { onClick: function onClick() {
              return open(_this2.props.data.avatar.url);
            }, height: "75px", src: this.props.data.avatar.url })
        );
      } else {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Placeholder"
          )
        );
      }
    }
  }]);

  return Meta;
}(React.Component);
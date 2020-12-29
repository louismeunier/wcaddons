"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InDepth = function (_React$Component) {
    _inherits(InDepth, _React$Component);

    function InDepth(props) {
        _classCallCheck(this, InDepth);

        var _this = _possibleConstructorReturn(this, (InDepth.__proto__ || Object.getPrototypeOf(InDepth)).call(this, props));

        _this.state = { shown: false };
        _this.toggleDisplay = _this.toggleDisplay.bind(_this);
        return _this;
    }

    _createClass(InDepth, [{
        key: "toggleDisplay",
        value: function toggleDisplay() {
            console.log("Pause");
            this.setState({ shown: !this.state.shown });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.shown) {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "button",
                        { id: "toggle-over-time", onClick: this.toggleDisplay },
                        "View Over Time"
                    ),
                    React.createElement(CompareOverTime, null)
                );
            } else {
                return React.createElement(
                    "button",
                    { id: "toggle-over-time", onClick: this.toggleDisplay },
                    "View Over Time"
                );
            }
        }
    }]);

    return InDepth;
}(React.Component);

var domContainer = document.getElementById("indepth");
ReactDOM.render(React.createElement(InDepth, null), domContainer);
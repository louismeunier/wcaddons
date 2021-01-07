"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Head = function (_React$Component) {
    _inherits(Head, _React$Component);

    function Head(props) {
        _classCallCheck(this, Head);

        var _this = _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).call(this, props));

        _this.state = { noPeople: 0 };
        chrome.storage.local.get(["wcaData"], function (items) {
            console.log(items.wcaData.length);
            _this.setState({ noPeople: items.wcaData.length });
        });
        return _this;
    }

    _createClass(Head, [{
        key: "formatHead",
        value: function formatHead() {
            var head = "";
            for (var i = 0; i < this.state.noPeople; i++) {
                if (i != this.state.noPeople - 1) {
                    head += "Head-to-";
                } else {
                    head += "Head";
                }
            }
            return head;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.noPeople != 0) {
                return React.createElement(
                    "h1",
                    null,
                    this.formatHead()
                );
            } else {
                return React.createElement(
                    "h1",
                    null,
                    "Loading"
                );
            }
        }
    }]);

    return Head;
}(React.Component);

var domContainer = document.querySelector('#header');
ReactDOM.render(React.createElement(Head, null), domContainer);
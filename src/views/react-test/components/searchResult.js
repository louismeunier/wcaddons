'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchResult = function (_React$Component) {
    _inherits(SearchResult, _React$Component);

    function SearchResult(props) {
        _classCallCheck(this, SearchResult);

        var _this = _possibleConstructorReturn(this, (SearchResult.__proto__ || Object.getPrototypeOf(SearchResult)).call(this, props));

        console.log(_this.props.res);
        return _this;
    }

    _createClass(SearchResult, [{
        key: "addPerson",
        value: function addPerson() {
            var _this2 = this;

            var id = this.props.res.wca_id;
            chrome.storage.local.get(["wcaData"], function (items) {
                var wcaData = items.wcaData;
                if (wcaData.indexOf(_this2.props.res.wca_id) != -1) {
                    alert("This person is already added!");return;
                }
                wcaData.push(_this2.props.res.wca_id);
                chrome.storage.local.set({ "wcaData": wcaData }, function (items) {
                    //Same as remove in meta.js; don't want to have to reload here, but can't get the <Person/> to rerender...
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                    });
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { className: "result" },
                React.createElement("img", { className: "result-avatar", src: this.props.res.avatar.url }),
                React.createElement(
                    "h1",
                    null,
                    this.props.res.name
                ),
                React.createElement(
                    "h2",
                    null,
                    this.props.res.wca_id
                ),
                React.createElement("img", { onClick: function onClick() {
                        _this3.addPerson();
                    }, className: "add-result", src: "../../../images/add.png" })
            );
        }
    }]);

    return SearchResult;
}(React.Component);
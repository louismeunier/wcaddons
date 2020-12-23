'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_React$Component) {
    _inherits(Result, _React$Component);

    function Result(props) {
        _classCallCheck(this, Result);

        var _this = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this, props));

        _this.eventFormatting = {};
        return _this;
    }

    _createClass(Result, [{
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "td",
                    { id: this.props.person.person.wca_id + "-" + this.props.event + "-single", className: this.props.event + "single" },
                    this.props.person.personal_records[this.props.event] != undefined && this.props.person.personal_records[this.props.event]["single"] != undefined ? this.props.person.personal_records[this.props.event]["single"].best / 100 : "-"
                ),
                React.createElement(
                    "td",
                    { id: this.props.person.person.wca_id + "-" + this.props.event + "-average", className: this.props.event + "average" },
                    this.props.person.personal_records[this.props.event] != undefined && this.props.person.personal_records[this.props.event]["average"] != undefined ? this.props.person.personal_records[this.props.event]["average"].best / 100 : "-"
                )
            );
        }
    }]);

    return Result;
}(React.Component);
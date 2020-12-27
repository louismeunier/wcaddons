'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Person = function (_React$Component) {
    _inherits(Person, _React$Component);

    function Person(props) {
        _classCallCheck(this, Person);

        var _this = _possibleConstructorReturn(this, (Person.__proto__ || Object.getPrototypeOf(Person)).call(this, props));

        _this.state = { data: [], noPeople: null, events: ["222", "333", "444", "555", "666", "777", "333bf", "333fm", "333oh", "clock", "minx", "pyram", "skewb", "sq1", "444bf", "555bf", "333mbf"] };
        _this.callAPI();
        //would like to add event listener here for chrome storage change to reload the stats page, but my fisrt attempt broke everything
        return _this;
    }

    _createClass(Person, [{
        key: "callAPI",
        value: function callAPI() {
            var _this2 = this;

            chrome.storage.local.get(["wcaData"], function (items) {
                var wcaIDs = items.wcaData;
                _this2.setState({ noPeople: wcaIDs.length });
                wcaIDs.forEach(function (id) {
                    axios.get("https://www.worldcubeassociation.org/api/v0/persons/" + id).then(function (response) {
                        var data = response.data;
                        _this2.setState(function (prevState) {
                            return { data: [].concat(_toConsumableArray(prevState.data), [data]) };
                        });
                    }).catch(function (error) {
                        //console.log("Error!");
                        return error;
                    }).then(function () {
                        console.log("API called");
                    });
                });
            });
        }
    }, {
        key: "format",
        value: function format(type) {
            var event, eventCol, eventForm, id;
            for (var i = 0; i < this.state.events.length; i++) {
                eventForm = [];
                event = this.state.events[i];
                eventCol = document.getElementsByClassName(event + type);
                if (eventCol.length != this.state.noPeople) return;
                for (var j = 0; j < eventCol.length; j++) {
                    eventForm.push(eventCol[j].innerText.fromMMSSMM());
                }
                if (eventForm.indexOf(Math.min.apply(Math, _toConsumableArray(eventForm))) != -1 && Math.min.apply(Math, _toConsumableArray(eventForm)) != Infinity) {
                    id = eventCol[eventForm.indexOf(Math.min.apply(Math, _toConsumableArray(eventForm)))].getAttribute("id");
                    document.getElementById(id).style.color = "orange";
                }
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            //console.log("Updated");
            this.format("single");
            this.format("average");
            setInitialTheme();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.noPeople === 0) {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "h1",
                        { id: "no-data" },
                        "No one added to compare!"
                    ),
                    React.createElement(AddPerson, null)
                );
            } else {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "table",
                        { id: "comparison" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement("td", { id: "whitespace" }),
                                this.state.data.map(function (person, index) {
                                    return React.createElement(Meta, { no: _this3.state.noPeople, key: index, data: person.person });
                                })
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    { className: "type-header" },
                                    "events"
                                ),
                                this.state.data.map(function (person, index) {
                                    return React.createElement(
                                        React.Fragment,
                                        { key: index },
                                        React.createElement(
                                            "td",
                                            { className: "type-header" },
                                            "single"
                                        ),
                                        React.createElement(
                                            "td",
                                            { className: "type-header" },
                                            "average"
                                        )
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.state.events.map(function (event, index) {
                                return React.createElement(
                                    "tr",
                                    { key: index },
                                    React.createElement(
                                        "td",
                                        { className: "event" },
                                        event
                                    ),
                                    _this3.state.data.map(function (person, index) {
                                        return React.createElement(Result, { key: index, person: person, event: event });
                                    })
                                );
                            })
                        )
                    ),
                    React.createElement(AddPerson, null)
                );
            }
        }
    }]);

    return Person;
}(React.Component);

var domContainer = document.querySelector('#stats');
ReactDOM.render(React.createElement(Person, null), domContainer);
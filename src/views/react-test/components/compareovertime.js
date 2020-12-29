"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window$Recharts = window.Recharts,
    LineChart = _window$Recharts.LineChart,
    Line = _window$Recharts.Line,
    XAxis = _window$Recharts.XAxis,
    YAxis = _window$Recharts.YAxis,
    CartesianGrid = _window$Recharts.CartesianGrid,
    Tooltip = _window$Recharts.Tooltip,
    Legend = _window$Recharts.Legend;

function dateConverter(date) {
    //returns date from WCA db as epoch time
    var dateObj = new Date(date);
    return dateObj.getTime();
}
function timeConverter(time) {
    return moment(time).format("MMM Do YY");
}

var CustomTooltip = function CustomTooltip(_ref) {
    var active = _ref.active,
        payload = _ref.payload,
        label = _ref.label;

    if (active) {
        console.log(payload);

        return React.createElement(
            "div",
            { className: "custom-tooltip" },
            React.createElement(
                "p",
                { className: "label" },
                timeConverter(label) + " : " + formatResult("333", parseInt(payload[0].value))
            ),
            React.createElement(
                "p",
                null,
                payload[0].dataKey
            )
        );
    }

    return null;
};

var CompareOverTime = function (_React$Component) {
    _inherits(CompareOverTime, _React$Component);

    function CompareOverTime(props) {
        _classCallCheck(this, CompareOverTime);

        var _this = _possibleConstructorReturn(this, (CompareOverTime.__proto__ || Object.getPrototypeOf(CompareOverTime)).call(this, props));

        _this.state = { data: [], graphData: [], computed: false, competitions: new Set(), colors: ["black", "white", "blue"] };
        var style = getComputedStyle(document.body);
        console.log(style.getPropertyValue('--main-bkd'));

        _this.getResults();
        return _this;
    }

    _createClass(CompareOverTime, [{
        key: "getCompetitionDates",
        value: function getCompetitionDates(competitionGets, competitionIds) {
            var _this2 = this;

            axios.all(competitionGets).then(axios.spread(function () {
                for (var _len = arguments.length, responses = Array(_len), _key = 0; _key < _len; _key++) {
                    responses[_key] = arguments[_key];
                }

                responses.forEach(function (res, index) {
                    //THIS IS REALLY SCUFFED
                    _this2.state.data.forEach(function (person) {
                        person.forEach(function (result) {
                            if (result.competition_id == Array.from(competitionIds)[index]) {
                                result.date = dateConverter(res.data.start_date);
                            }
                        });
                    });
                });
            })).catch(function (errors) {
                console.error(errors);
            }).then(function () {
                _this2.formatData();
            });
        }
    }, {
        key: "getResults",
        value: function getResults() {
            var _this3 = this;

            chrome.storage.local.get(["wcaData"], function (items) {
                var ids = items.wcaData;
                var tbR = [];
                var baseURL = "https://www.worldcubeassociation.org/api/v0/persons/";
                ids.forEach(function (id, index) {
                    tbR.push(axios.get(baseURL + id + "/results"));
                });
                axios.all(tbR).then(axios.spread(function () {
                    for (var _len2 = arguments.length, responses = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        responses[_key2] = arguments[_key2];
                    }

                    responses.forEach(function (res, index) {
                        _this3.state.data.push([]);
                        res.data.forEach(function (result) {
                            if (result.event_id == "333") {
                                _this3.state.data[index].push(result);
                                _this3.setState(function (prevState) {
                                    competitions: prevState.competitions.add(result.competition_id);
                                });
                            }
                        });
                    });
                })).catch(function (errors) {
                    console.error(errors);
                }).then(function () {
                    var tbRC = [];
                    _this3.state.competitions.forEach(function (comp) {
                        return tbRC.push(axios.get("https:/www.worldcubeassociation.org/api/v0/competitions/" + comp));
                    });
                    _this3.getCompetitionDates(tbRC, _this3.state.competitions);
                    //this.state.competitions.forEach(competitionId=>this.getCompetitionDates(competitionId));
                    //console.log(this.state.data);
                });
            });
        }
    }, {
        key: "formatData",
        value: function formatData() {
            var _this4 = this;

            this.state.data.forEach(function (person, index) {
                person.forEach(function (result) {
                    var wcaId = result.wca_id;
                    _this4.setState(function (prevState) {
                        graphData: prevState.graphData.push(_defineProperty({ date: result.date }, wcaId, result.average === -1 ? null : result.average));
                    });
                });
            });
            this.setState({ computed: true });
            console.log("should rerender now");
            console.log(this.state.data[0][0].wca_id);
        }
    }, {
        key: "formatXAxis",
        value: function formatXAxis(tickItem) {
            return moment(tickItem).format("MMM Do YY");
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (!this.state.computed) {
                return React.createElement(Loading, null);
            } else {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        LineChart,
                        {
                            width: 2500,
                            height: 800,
                            data: this.state.graphData,
                            margin: { top: 5, right: 20, left: 10, bottom: 5 }
                        },
                        React.createElement(XAxis, { dataKey: "date", type: "number", domain: ['dataMin', 'dataMax'], tickFormatter: this.formatXAxis }),
                        React.createElement(Tooltip, { content: React.createElement(CustomTooltip, null) }),
                        React.createElement(CartesianGrid, { stroke: "#f5f5f5" }),
                        this.state.data.map(function (person, index) {
                            return React.createElement(Line, { type: "monotone", dataKey: person[0].wca_id, stroke: _this5.state.colors[index], yAxisId: 0 });
                        })
                    )
                );
            }
        }
    }]);

    return CompareOverTime;
}(React.Component);
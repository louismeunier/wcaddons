'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_React$Component) {
  _inherits(Result, _React$Component);

  function Result(props) {
    _classCallCheck(this, Result);

    return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this, props));
    //this.state = { show: "time" }
  }
  /*
    toggleDisplay(type) {
      if (this.props.person.personal_records[this.props.event]== undefined) return;
  
      var time = this.props.person.personal_records[this.props.event][type].best;
      var worldRank = this.props.person.personal_records[this.props.event][type].world_rank;
      var continentRank = this.props.person.personal_records[this.props.event][type].continent_rank;
      var countryRank = this.props.person.personal_records[this.props.event][type].country_rank;
      
      var newState;
      if (this.state.show=="time") {
        newState="worldRank";
        this.setState({ show: newState })
        return time;
       
      }
      else if (this.state.show=="worldRank") {
        newState="continentRank";
        this.setState({ show: newState })
        return worldRank;
      }
      else if (this.state.show=="continentRank") {
        newState="countryRank";
        this.setState({ show: newState })
        return continentRank;
      }
      else if (this.state.show=="countryRank") {
        newState="time";
        this.setState({ show: newState })
        return countryRank;
      }
      
  
    } */


  _createClass(Result, [{
    key: "render",
    value: function render() {
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "td",
          { id: this.props.person.person.wca_id + "-" + this.props.event + "-single", className: this.props.event + "single" },
          this.props.person.personal_records[this.props.event] != undefined && this.props.person.personal_records[this.props.event]["single"] != undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["single"].best) : "-"
        ),
        React.createElement(
          "td",
          { id: this.props.person.person.wca_id + "-" + this.props.event + "-average", className: this.props.event + "average" },
          this.props.person.personal_records[this.props.event] != undefined && this.props.person.personal_records[this.props.event]["average"] != undefined ? formatResult(this.props.event, this.props.person.personal_records[this.props.event]["average"].best) : "-"
        )
      );
    }
  }]);

  return Result;
}(React.Component);
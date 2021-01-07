'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddPerson = function (_React$Component) {
  _inherits(AddPerson, _React$Component);

  function AddPerson(props) {
    _classCallCheck(this, AddPerson);

    var _this = _possibleConstructorReturn(this, (AddPerson.__proto__ || Object.getPrototypeOf(AddPerson)).call(this, props));

    _this.state = { value: '', submitted: false };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(AddPerson, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
      //If I uncomment the below, it will cause constant searching, which is nice, but also makes far more api calls so maybe slower
      //this.handleSubmit(event);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this2 = this;

      this.setState({ submitted: true });
      axios.get("https://www.worldcubeassociation.org/api/v0/search/users?q=" + this.state.value).then(function (response) {
        var data = response.data;
        //remove all results w/o wca id (useless, can't look up results) AND limit to first 5 results
        var formattedResult = data.result.filter(function (e) {
          return e.wca_id != null;
        }).slice(0, 5);
        _this2.setState({ result: formattedResult });
      }).catch(function (error) {
        console.log(error);
      }).then(function () {
        _this2.setState({ submitted: false });
      });
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.result) {
        return React.createElement(
          'div',
          { id: 'search' },
          React.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            React.createElement('input', { id: 'add-input', type: 'text', value: this.state.value, onChange: this.handleChange, placeholder: 'Search by Name/WCA ID' }),
            React.createElement('img', { src: '../../../images/search.png', onClick: this.handleSubmit, height: '24' })
          )
        );
      } else {
        if (this.state.submitted) {
          return React.createElement(
            'div',
            { id: 'search' },
            React.createElement(
              'form',
              { onSubmit: this.handleSubmit },
              React.createElement('input', { id: 'add-input', type: 'text', value: this.state.value, onChange: this.handleChange, placeholder: 'Search by Name/WCA ID' }),
              React.createElement('img', { src: '../../../images/search.png', onClick: this.handleSubmit, height: '24' })
            ),
            React.createElement(Loading, null)
          );
        } else {
          if (this.state.result.length != 0) {
            return React.createElement(
              'div',
              { id: 'search' },
              React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement('input', { id: 'add-input', type: 'text', value: this.state.value, onChange: this.handleChange, placeholder: 'Search by Name/WCA ID' }),
                React.createElement('img', { src: '../../../images/search.png', onClick: this.handleSubmit, height: '24' })
              ),
              React.createElement(
                'div',
                { id: 'results' },
                this.state.result.map(function (person, index) {
                  return React.createElement(
                    React.Fragment,
                    { key: index },
                    React.createElement(SearchResult, { key: index, res: person }),
                    React.createElement('br', null)
                  );
                })
              )
            );
          } else {
            return React.createElement(
              'div',
              { id: 'search' },
              React.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                React.createElement('input', { id: 'add-input', type: 'text', value: this.state.value, onChange: this.handleChange, placeholder: 'Search by Name/WCA ID' }),
                React.createElement('img', { src: '../../../images/search.png', onClick: this.handleSubmit, height: '24' })
              ),
              React.createElement(
                'h1',
                { id: 'no-results' },
                'No results found!'
              )
            );
          }
        }
      }
    }
  }]);

  return AddPerson;
}(React.Component);
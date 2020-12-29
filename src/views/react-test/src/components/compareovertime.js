"use strict";
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = window.Recharts;
function dateConverter(date) {
    //returns date from WCA db as epoch time
    var dateObj = new Date(date);
    return dateObj.getTime()
}
function timeConverter(time) {
    return moment(time).format("MMM Do YY")
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
        console.log(payload);

		return (
			<div className="custom-tooltip">
				<p className="label">{`${timeConverter(label)} : ${formatResult("333",parseInt(payload[0].value))}`}</p>
                <p>{payload[0].dataKey}</p>
			</div>
		);
	}

	return null;
};
class CompareOverTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], graphData: [], computed:false, competitions: new Set(), colors: ["black","white","blue"] }
        var style = getComputedStyle(document.body);
        console.log(style.getPropertyValue('--main-bkd'));

        this.getResults();
    }
    
    getCompetitionDates(competitionGets,competitionIds) {
        axios.all(competitionGets)
            .then(axios.spread((...responses) => {
                responses.forEach((res,index)=> {
                    //THIS IS REALLY SCUFFED
                    this.state.data.forEach(person=>{
                        person.forEach(result=>{
                            if (result.competition_id==Array.from(competitionIds)[index]) {
                                result.date = dateConverter(res.data.start_date);
                            }
                        })
                    })
                })
            }))
            .catch((errors)=>{
                console.error(errors);
            })
            .then(()=>{
                this.formatData();
            })
        }
    getResults() {
        chrome.storage.local.get(["wcaData"], (items)=> {
            var ids = items.wcaData;
            var tbR = [];
            var baseURL = "https://www.worldcubeassociation.org/api/v0/persons/"
            ids.forEach((id,index)=> {tbR.push(axios.get(baseURL+id+"/results"))});
            axios.all(tbR)
                .then(axios.spread((...responses) => {
                    responses.forEach((res,index) => {
                        this.state.data.push([]);
                        res.data.forEach(result => { 
                            if (result.event_id=="333") {
                                this.state.data[index].push(result);
                                this.setState(prevState => { competitions: prevState.competitions.add(result.competition_id) })
                            }
                        });

                    })

                    }))
                .catch(errors=>{
                    console.error(errors);
                }) 
                .then(()=> {
                    var tbRC = [];
                    this.state.competitions.forEach(comp=>tbRC.push(axios.get(`https:/www.worldcubeassociation.org/api/v0/competitions/${comp}`)));
                    this.getCompetitionDates(tbRC,this.state.competitions);
                    //this.state.competitions.forEach(competitionId=>this.getCompetitionDates(competitionId));
                    //console.log(this.state.data);
                })
        })
    }
    formatData() {
        
        this.state.data.forEach((person,index) => {
            person.forEach((result) => {
                var wcaId = result.wca_id;
                this.setState(prevState=>{ graphData: prevState.graphData.push({ date:result.date, [wcaId]: result.average===-1?null:result.average})});
            })
        })
        this.setState({ computed: true});
        console.log("should rerender now");
        console.log(this.state.data[0][0].wca_id);
    }
    formatXAxis(tickItem) {
        return moment(tickItem).format("MMM Do YY");
    }
    
    render() {
        if (!this.state.computed) {
            return <Loading/>
        }
        else {
        return (
            <React.Fragment>
            <LineChart
     width={2500}
    height={800}
    data={this.state.graphData}
    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
        <XAxis dataKey="date" type="number" domain={['dataMin', 'dataMax']} tickFormatter={this.formatXAxis}/>
        <Tooltip content={<CustomTooltip />}/>
         <CartesianGrid stroke="#f5f5f5" />
         {this.state.data.map((person,index)=><Line type="monotone" dataKey={person[0].wca_id} stroke={this.state.colors[index]} yAxisId={0} />)}
    </LineChart>
    </React.Fragment>
        )}
    }
}
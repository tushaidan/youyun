class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "chart_" + (new Date()).valueOf() + "_" + Math.floor(Math.random() * 100),
            chart: {}
        }
    }
    renderChart() {
        let series = this.props.series || {}

        let option2 = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}"
            },
            series: {
                type: 'graph',
                layout: 'none',
                animation: false,
                data: series.nodes,
                edges: series.edges
            }
        }

        this.state.chart.setOption(option2)
    }
    componentDidMount() {
        this.state.chart = echarts.init(document.querySelector("#" + this.state.id + ">.chart"))
        this.renderChart()
        this.state.chart.on("click", (param)=> {
            this.props.onSelect(param.name)
        })
    }
    componentDidUpdate(prevProps, prevState) {
        this.renderChart()
    }
    render() {
        let width = parseInt(this.props.width) || 150
        let height = parseInt(this.props.height) || 150
        return(
            <div id={this.state.id} className="chart_wapper">
                <div className="chart graph" style={{width:width, height:height}}></div>
                <div className={(_.isEmpty(this.props.series))? "nulldata": "fn-none"}>Null</div>
            </div>
        )
    }
}

export default Graph

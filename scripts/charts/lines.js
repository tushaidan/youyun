class Lines extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "chart_" + (new Date()).valueOf() + "_" + Math.floor(Math.random()*100),
            chart: {}
        }
    }
    renderChart() {
        let series = this.props.data.series || []
        let xAxis = this.props.data.xAxis || []
        if (!series.length || !xAxis.length || series[0].data.length != xAxis.length) return

        let option = {
            title: {
                text: this.props.title || '',
                subtext: this.props.subtitle || ''
            },
            legend: {
                data: series.map(item => {
                    return item.legend
                })
            },
            tooltip : {
                trigger: 'axis'
            },
            xAxis: [{
                type: 'category',
                data: xAxis
            }],
            yAxis: [{
                type: 'value',
                name : this.props.yAxis || []
            }],
            series: series.map((item, index) => {
                return {
                    data: item.data,
                    name: item.legend,
                    smooth: true,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    type: 'line'
                }
            })
        }

        this.state.chart.setOption(option)
    }
    componentDidMount() {
        this.state.chart = echarts.init(document.querySelector("#" + this.state.id + ">.chart"))
        this.renderChart()
    }
    componentDidUpdate() {
        this.renderChart()
    }
    render() {
        return (
            <div id={this.state.id} className="chart_wapper">
                <div className="chart lines"></div>
                <div className={(this.props.data.xAxis && this.props.data.xAxis.length)? "fn-none": "nulldata"}>Null</div>
            </div>
        )
    }
}

export default Lines

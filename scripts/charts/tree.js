// require echarts2
class Tree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "chart_" + (new Date()).valueOf() + "_" + Math.floor(Math.random() * 100),
            chart: {}
        }
    }
    renderChart() {
        let series = this.props.series || {}

        var option = {
            title: {
                text: series.name || "",
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}"
            },
            series: [
                {
                    name: series.name || "",
                    type: 'tree',
                    orient: 'vertical', // vertical horizontal
                    rootLocation: {x: 'center', y: 50}, // 根节点位置
                    symbol: 'circle',
                    symbolSize: 40,
                    data: series
                }
            ]
        };

        this.state.chart.setOption(option)
    }
    componentDidMount() {
        this.state.chart = echarts.init(document.querySelector("#" + this.state.id + ">.chart"))
        this.renderChart()
        this.state.chart.on(echarts.config.EVENT.CLICK, (param)=> {
            this.props.onSelect(param.name)
        })
    }
    componentDidUpdate() {
        this.renderChart()
    }
    render() {
        let width = parseInt(this.props.width) || 150
        let height = parseInt(this.props.height) || 150
        return(
            <div id={this.state.id} className="chart_wapper">
                <div className="chart tree" style={{width:width, height:height}}></div>
                <div className={(this.props.series && this.props.series.length)? "fn-none": "nulldata"}>Null</div>
            </div>
        )
    }
}

export default Tree

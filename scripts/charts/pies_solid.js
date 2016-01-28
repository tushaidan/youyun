class PiesSolid extends React.Component {
    chart_id = "chart_" + (new Date()).valueOf() + "_" + Math.floor(Math.random()*100);
    chart = {};
    renderChart() {
        let series = this.props.series || []
        let radius = parseInt(this.props.radius) || 60
        // let thickness = radius/3
        let thickness = 12
        let title = this.props.title || (series.length? series[0].value+"%" :'')

        let data = series.map((item, index) => {
            return {
                name: item.legend,
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                itemStyle : {
                    normal: {
                        label: {show: false},
                        labelLine: {show: false},
                        color: '#18ae89' //'#B2DE31'
                    }
                },
                radius: [radius - thickness - index*thickness, radius - index*thickness],
                data:[
                    {
                        value: item.value,
                        name: item.legend
                    },
                    {
                        value: 100-item.value,
                        name: 'invisible',
                        itemStyle: {
                            normal : {
                                color: 'rgba(0,0,0,0)',
                                label: {show:false},
                                labelLine: {show:false}
                            },
                            emphasis : {
                                color: 'rgba(0,0,0,0)'
                            }
                        }
                    }
                ]
            }
        })
        data.push({
            name: "",
            type:'pie',
            radius: [0, radius - series.length*thickness],
            hoverAnimation: false,
            itemStyle : {
                normal: {
                    color: '#efefef'
                }
            },
            data:[
                {value:100, name: ""}
            ]
        },)

        // http://echarts.baidu.com/doc/example/pie6.html
        let option = {
            title: {
                text: title,
                subtext: this.props.subtext || '',
                itemGap: 5,
                x: 'center',
                y: 'center',
                textStyle: {
                    color: '#18ae89',
                    fontFamily: '微软雅黑',
                    fontSize: 20
                },
                subtextStyle: {
                    color: '#18ae89',
                    fontFamily: '微软雅黑',
                    fontSize: 18
                }
            },
            tooltip: {
                show: true,
                formatter: "{a}: {c}%"
            },
            series: data
        }

        this.chart.setOption(option)
    }
    componentDidMount() {
        this.chart = echarts.init(document.querySelector("#" + this.chart_id + ">.chart"))
        this.renderChart()
    }
    componentDidUpdate() {
        this.renderChart()
    }
    render() {
        let radius = parseInt(this.props.radius) || 60
        return (
            <div id={this.chart_id} className="chart_wapper">
                <div className="chart pies_solid" style={{width:radius*2, height:radius*2}}></div>
                <div className={(this.props.series && this.props.series.length)? "fn-none": "nulldata"}>Null</div>
            </div>
        )
    }
}

export default PiesSolid

import Lines from "../charts/lines"
import request from "../request"
import monitor_type from "../enums/monitor_types"

class MonitorRuntime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cpu_history_line: {},
            mem_history_line: {},
            diskio_history_line: {},
            netio_history_line: {}
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request("monitors/cpu/history", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({cpu_history_line: this.filterCpuSeries(data)})
        })
        request("monitors/mem/history", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({mem_history_line: this.filterMemSeries(data)})
        })
        request("monitors/diskio/history", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({diskio_history_line: this.filterDiskioSeries(data)})
        })
        request("monitors/netio/history", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({netio_history_line: this.filterNetioSeries(data)})
        })
    }
    filterCpuSeries(data) {
        return {
            xAxis: data.map((item, index) => {
                return moment(item.clock).format('hh:mm')
            }),
            series:  [{
                legend: "CPU用量",
                data: data.map((item, index) => {
                    return item.data.useValue
                })
            }]
        }
    }
    filterMemSeries(data) {
        return {
            xAxis: data.map((item, index) => {
                return moment(item.clock).format('hh:mm')
            }),
            series:  [{
                legend: "内存用量",
                data: data.map((item, index) => {
                    return item.data.useValueSum
                })
            }]
        }
    }
    filterDiskioSeries(data) {
        return {
            xAxis: data.map((item, index) => {
                return moment(item.clock).format('hh:mm')
            }),
            series:  [{
                legend: "磁盘读",
                data: data.map((item, index) => {
                    return item.data.readRateSum
                })
            },{
                legend: "磁盘写",
                data: data.map((item, index) => {
                    return item.data.writeRateSum
                })
            }]
        }
    }
    filterNetioSeries(data) {
        return {
            xAxis: data.map((item, index) => {
                return moment(item.clock).format('hh:mm')
            }),
            series:  [{
                legend: "网络入口流量",
                data: data.map((item, index) => {
                    return item.data.outRateSum
                })
            },{
                legend: "网络出口流量",
                data: data.map((item, index) => {
                    return item.data.inRateSum
                })
            }]
        }
    }
    render() {
        return (
            <div id="monitor_history" className="row">
                <div className="col-md-3 col-lg-6">
                    <Lines data={this.state.cpu_history_line} title="CPU使用趋势" />
                </div>
                <div className="col-md-3 col-lg-6">
                    <Lines data={this.state.mem_history_line} title="内存使用趋势" />
                </div>
                <div className="col-md-3 col-lg-6">
                    <Lines data={this.state.diskio_history_line} title="磁盘读写趋势" />
                </div>
                <div className="col-md-3 col-lg-6">
                    <Lines data={this.state.netio_history_line} title="网络流量趋势" />
                </div>
            </div>
        )
    }
}



export default MonitorRuntime

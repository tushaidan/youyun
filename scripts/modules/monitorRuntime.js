import Pies from "../charts/pies"
import request from "../request"
import monitor_type from "../enums/monitor_types"

class MonitorRuntime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cpu_runtime: {
                "maxValueSum": 0,
                "useValueSum": 0,
                "ratio": 0,
                "maxValuePer": 0,
                "nodeNum": 0
            },
            mem_runtime: {
                "maxValueSum": 0,
                "useValueSum": 0,
                "ratio": 0,
                "maxValuePer": 0,
                "nodeNum": 0
            },
            disk_runtime: {
                "maxValueSum": 0,
                "useValueSum": 0,
                "ratio": 0,
                "maxValuePer": 0,
                "nodeNum": 0
            },
            diskio_runtime: {
                "readRateSum": 0,
                "writeRateSum": 0
            },
            netio_runtime: {
                "outRateSum": 0,
                "inRateSum": 0
            }
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request("monitors/cpu/runtime", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({cpu_runtime: data})
        })
        request("monitors/disk/runtime", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({disk_runtime: data})
        })
        request("monitors/diskio/runtime", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({diskio_runtime: data})
        })
        request("monitors/mem/runtime", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({mem_runtime: data})
        })
        request("monitors/netio/runtime", "POST", {idType: monitor_type["用户"]}).done(data => {
            this.setState({netio_runtime: data})
        })
    }
    filterSeries(data) {
        return {
            cpu_runtime_pie: [{
                value: data.cpu_runtime.ratio,
                legend: "CPU利用率"
            }],
            mem_runtime_pie: [{
                value: data.mem_runtime.ratio,
                legend: "内存利用率"
            }],
            disk_runtime_pie: [{
                value: data.disk_runtime.ratio,
                legend: "磁盘利用率"
            }],
            diskio_runtime_pie: [{
                value: data.diskio_runtime.readRateSum,
                legend: "磁盘IO利用率"
            }],
            netio_runtime_pie: [{
                value: data.netio_runtime.outRateSum,
                legend: "网络利用率"
            }]
        }
    }
    render() {
        let series = this.filterSeries(this.state)
        return (
            <div id="monitor_runtime" className="row">
                <div className="col-md-3 col-lg-2">
                    <Pies series={series.cpu_runtime_pie} title="CPU" subtext={this.state.cpu_runtime.ratio+"%"} />
                    <p className="primary">{this.state.cpu_runtime.useValueSum}GHz</p>
                    <p>{this.state.cpu_runtime.maxValueSum}GHz</p>
                </div>
                <div className="col-md-3 col-lg-2">
                    <Pies series={series.mem_runtime_pie} title="内存" subtext={this.state.mem_runtime.ratio+"%"} />
                    <p className="primary">{this.state.mem_runtime.useValueSum}GB</p>
                    <p>{this.state.mem_runtime.maxValueSum}GB</p>
                </div>
                <div className="col-md-3 col-lg-2">
                    <Pies series={series.disk_runtime_pie} title="磁盘" subtext={this.state.disk_runtime.ratio+"%"} />
                    <p className="primary">{this.state.disk_runtime.useValueSum}GB</p>
                    <p>{this.state.disk_runtime.maxValueSum}GB</p>
                </div>
                <div className="col-md-3 col-lg-2">
                    <Pies series={series.diskio_runtime_pie} title="磁盘IO" subtext={this.state.diskio_runtime.readRateSum+""} />
                    <p className="primary">{this.state.diskio_runtime.readRateSum}KB</p>
                    <p>{this.state.diskio_runtime.writeRateSum}KB</p>
                </div>
                <div className="col-md-3 col-lg-2">
                    <Pies series={series.netio_runtime_pie} title="网络IO" subtext={this.state.netio_runtime.outRateSum+""} />
                    <p className="primary">{this.state.netio_runtime.outRateSum}Kbps</p>
                    <p>{this.state.netio_runtime.inRateSum}Kbps</p>
                </div>
            </div>
        )
    }
}

export default MonitorRuntime

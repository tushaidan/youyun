import Lines from "../charts/lines"
import status from "../enums/app_status"
import request from "../request"
import MonitorRuntime from "../modules/monitorRuntime"
import LogTable from "../modules/log"
import ApplicationTable from "./modules/applicationTable"

class AppPandect extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request("services/" + this.props.params.serviceId).done(data => {
            this.setState({data: data || {}})
        })
    }
    filter(item) {
        item.runTimeStr = moment.duration(item.runTime*1000).humanize()
        item.runStatusObj = status[item.runStatus]
        item.startTimeStr = moment(item.startTime).format('YYYY-MM-DD hh:mm')
        return item
    }
    render() {
        let data = this.filter(this.state.data)
        return (
            <div>
                <h2>服务详情</h2>
                <div id="appdetails">
                    <h3>
                        {data.serviceName}
                        <span className="badge">{data.version}</span>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-power-off"></i>停止</button>
                            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-cloud-upload"></i>升级</button>
                            <button type="button" className="btn btn-default btn-sm"><i className="fa fa-trash"></i>卸载</button>
                        </div>
                        <div className="btn-group more">
                            <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-angle-double-down"></i>更多
                            </button>
                            <ul className="dropdown-menu">
                                <li><a href="#">编辑</a></li>
                                <li><a href="#">部署</a></li>
                                <li><a href="#">删除</a></li>
                                <li><a href="#">启动</a></li>
                                <li><a href="#">升级</a></li>
                            </ul>
                        </div>
                    </h3>
                    <div className="row">
                        <div className="col-md-3 fn-tac">
                            <img src="/images/wp.png" />
                            <p className={`status ${data.runStatusObj && data.runStatusObj.color}`}>{data.runStatusObj && data.runStatusObj.text}</p>
                        </div>
                        <div className="col-md-9 border-lt">
                            <div className="row">
                                <div className="col-md-4">
                                    <p>服务类型：{data.type}</p>
                                    <p>节点：{data.nodeNum}</p>
                                    <p>依赖服务：{data.todo}</p>
                                </div>
                                <div className="col-md-4 border-lt">
                                    <p>所属云：{data.todo}</p>
                                    <p>运行时长：{data.runTimeStr}</p>
                                    <p>实例配置：{data.cpu}GHz/{data.memory}G/{data.database}G</p>
                                </div>
                                <div className="col-md-4 border-lt">
                                    <p>最近启动时间：{data.startTimeStr}</p>
                                    <p>镜像：{data.todo}</p>
                                </div>
                            </div>
                            <p className="mt10">应用描述：{data.description}</p>
                        </div>
                    </div>
                </div>
                <h2>运行信息</h2>
                <MonitorRuntime />
                <h2>应用列表</h2>
                <ApplicationTable />
                <h2>操作记录</h2>
                <LogTable type="service" paramsId={this.props.params.serviceId} />
            </div>
        );
    }
}

export default AppPandect

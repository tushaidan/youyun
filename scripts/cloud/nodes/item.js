import request from "../../request"
const Link = ReactRouter.Link
import MonitorHistory from "../../modules/monitorHistory"
import LogTable from "./modules/nodeOperationLog"

class AppNodeItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "节点名称",
            status: '运行中',
            image: "centos 6",
            cloud: "阿里云",
            config: "触发",
            store: "触发",
            app: "触发",
            ip: '12.10.125.1',
            pubip: '192.123.345.12',
            start_time: '2015-10-10 09:00:00',
            run_duration: '12天13小时52分',
            nettype: '专有网络',
        }
    }

    renderLogTable () {
        this.table && this.table.destroy()
        this.table = new Handsontable(document.querySelector("#schedules_log_table"), {
            data: this.state.logs,
            colHeaders: [
                "执行时间", "执行节点", "执行人", "结果"
            ],
            stretchH: 'all',
            columns: [
                {
                    data: 'time',
                    editor: false
                }, {
                    data: 'nodes',
                    editor: false
                }, {
                    data: 'operater',
                    editor: false
                }, {
                    data: 'result',
                    editor: false
                }
            ],
            search: {
                queryMethod: function(queryStr, value) {
                    return value.includes(queryStr)
                }
            }
        })
    }
    componentDidMount () {
        this.renderLogTable()

        $('#scripts_tab a').on("click", function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    }
    render () {
        return(
            <div id="schedules_item">
                <h2>节点运行信息
                    <Link className="fn-right" to={`/cloud/nodes`}>返回节点管理</Link>
                </h2>
                <div className="row infos">
                    <div className="col-md-2">
                        节点名称：
                    </div>
                    <div className="col-md-4">
                        {this.state.name}
                    </div>
                    <div className="col-md-2">
                        状态：
                    </div>
                    <div className="col-md-4">
                        {this.state.status}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        所属云：
                    </div>
                    <div className="col-md-4">
                        {this.state.cloud}
                    </div>
                    <div className="col-md-2">
                        镜像：
                    </div>
                    <div className="col-md-4">
                        {this.state.image}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        配置：
                    </div>
                    <div className="col-md-4">
                        {this.state.config}
                    </div>
                    <div className="col-md-2">
                        存储：
                    </div>
                    <div className="col-md-4">
                        {this.state.store}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        应用：
                    </div>
                    <div className="col-md-4">
                        {this.state.app}
                    </div>
                    <div className="col-md-2">
                        网络类型：
                    </div>
                    <div className="col-md-4">
                        {this.state.nettype}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        最近启动时间：
                    </div>
                    <div className="col-md-4">
                        {this.state.start_time}
                    </div>
                    <div className="col-md-2">
                        IP：
                    </div>
                    <div className="col-md-4">
                        {this.state.ip}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        运行时长：
                    </div>
                    <div className="col-md-4">
                        {this.state.run_duration}
                    </div>
                    <div className="col-md-2">
                        公网IP：
                    </div>
                    <div className="col-md-4">
                        {this.state.pubip}
                    </div>
                </div>
                <div className="row">
                    <h4>实时监控</h4>
                    <MonitorHistory />
                </div>
                <div className="row">
                    <h4>操作信息</h4>
                    <LogTable type="app" paramsId={this.props.params.appId} />
                </div>
            </div>
        )
    }
}

export default AppNodeItem

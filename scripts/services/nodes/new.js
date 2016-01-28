import request from "../../request"
import {getHeight} from "../../assembly"
import {typesOption} from "../../enums/net_types"
import {statusOption} from "../../enums/node_status"
const Link = ReactRouter.Link

class ServiceNodeNew extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                nodeId: "1",
                name: '节点名称 1',
                system: 'ubunt',
                network: '12.10.125.1',
                status: '运行中',
                start_time: '2015-10-10 09:00:00',
                run_duration: '12天13小时52分',
                nettype: '经典网络',
                configure: 'CPU：2核',
            }, {
                nodeId: "2",
                name: '节点名称 2',
                system: 'windows',
                network: '12.10.12.2',
                status: '停止中',
                start_time: '2015-10-10 12:00:00',
                run_duration: '12天13小时12分',
                nettype: '专有网络',
                configure: 'CPU：2核',
            }, {
                nodeId: "3",
                name: '节点名称 3',
                system: 'windows',
                network: '12.10.125.3',
                status: '运行中',
                start_time: '2015-10-10 09:23:00',
                run_duration: '12天13小时23分',
                nettype: '经典网络',
                configure: 'CPU：2核',
            }]
        }
    }
    renderTable(data) {
        $("#net_types", this.root).select2().on("select2:select", (e)=> {
            let type = e.params.data.id
            type = type == "all"? _.map(typesOption, 'label'): type
            this.$table.bootstrapTable('filterBy', {nettype: type})
        })

        $("#node_status", this.root).select2().on("select2:select", (e)=> {
            let status = e.params.data.id
            status = status == "all"? _.map(statusOption, 'label'): status
            this.$table.bootstrapTable('filterBy', {status: status})
        })

        this.$register = $("#register", this.root)
        this.$table = $('#node_table', this.root).bootstrapTable({
            // height: getHeight() - 68,
            columns: [{
                checkbox: true
            }, {
                field: 'nodeId',
                visible: false
            }, {
                field: 'name',
                title: '节点名称',
            }, {
                field: 'system',
                title: '操作系统',
            }, {
                field: 'network',
                title: 'IP地址'
            }, {
                field: 'status',
                title: '状态'
            }, {
                field: "start_time",
                title: '启动时间',
                // sortable: true,
            }, {
                field: "run_duration",
                title: '运行时长'
            }, {
                field: "nettype",
                title: '网络类型'
            }, {
                field: "configure",
                title: '配置'
            }],
            data: this.state.data
        })

        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', ()=> {
            let selections = this.getIdSelections()
            this.$register.prop('disabled', !selections.length)
        })
        this.$register.click(()=> {
            let ids = this.getIdSelections()
            alert("注册：" + JSON.stringify(ids))
            this.$register.prop('disabled', true)
        })
    }
    getIdSelections() {
        return $.map(this.$table.bootstrapTable('getSelections'), function (row) {
            return row.nodeId
        })
    }
    loadData() {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount() {
        this.root = $("#nodes")
        this.loadData()
        this.renderTable()
    }
    addNode() {

    }
    render() {
        return (
            <div id="nodes">
                <h2>节点注册
                    <Link className="fn-right" to={`/app/${this.props.params.appId}/nodes`}>返回节点管理</Link>
                </h2>
                <div id="node_toolbar">
                    <span className="ml10">
                        网络类型：
                        <select id="net_types" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {typesOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                    <span className="ml10">
                        状态：
                        <select id="node_status" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {statusOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="node_table"
                    data-toolbar="#node_toolbar"
                    data-search="true">
                </table>
                <div className="mt10">
                    <a className="btn btn-primary" id="register">注册</a>
                </div>
            </div>
        )
    }
}

export default ServiceNodeNew

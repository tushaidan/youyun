import request from "../../request"
import HistoryMixin from '../../history_mixin'
import BillingConfig from "../../modules/billingConfig"
import {getHeight} from "../../assembly"
import {typesOption} from "../../enums/net_types"
import {statusOption} from "../../enums/node_status"
const Link = ReactRouter.Link

class NodeIndex extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            applicationsOption: [
                {
                    "value": "KbmaRtC0MRCNapCjrObu2g4UfTjiQV6G",
                    "label": "应用名称1",
                },
                {
                    "value": "KbmaRtC0MRCNapCjrObu2g4ertweriQV6G",
                    "label": "应用名称2",
                },
                {
                    "value": "KbmaRtC0MRCNapCjqwrqwerTjiQV6G",
                    "label": "应用名称3",
                },
                {
                    "value": "KbmaRtC0MRCNapqweqw4UfTjiQV6G",
                    "label": "应用名称4",
                }
            ],
            data: [{
                nodeId: "1",
                name: '节点名称 1',
                intranet: '12.10.125.1',
                pubnetwork: '192.123.345.12',
                status: '运行中',
                service: 'nimbus',
                start_time: '2015-10-10 09:00:00',
                run_duration: '12天13小时52分',
                nettype: '专有网络',
            }, {
                nodeId: "2",
                name: '节点名称 2',
                intranet: '12.10.125.2',
                pubnetwork: '',
                status: '停止中',
                service: 'ui',
                start_time: '2015-10-10 09:00:00',
                run_duration: '12天13小时52分',
                nettype: '经典网络',
            }, {
                nodeId: "3",
                name: '节点名称 3',
                intranet: '12.10.125.3',
                status: '运行中',
                service: 'device',
                start_time: '2015-10-10 09:00:00',
                run_duration: '12天13小时52分',
                nettype: '经典网络',
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

        $("#applications_select", this.root).select2().on("select2:select", (e)=> {
            let apps = e.params.data.id
            apps = apps == "all"? _.map(this.state.applicationsOption, 'label'): status
            // this.$table.bootstrapTable('filterBy', {status: apps})
        })

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
                field: 'intranet',
                title: '内网IP地址',
            }, {
                field: 'pubnetwork',
                title: '公网IP地址'
            }, {
                field: 'status',
                title: '状态'
            }, {
                field: "service",
                title: '服务'
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
                field: 'operate',
                title: '操作',
                events: {
                    "click .console": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/cloud/node/${row.nodeId}`)
                    },
                    "click .detail": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/cloud/node/${row.nodeId}`)
                    }
                },
                formatter: `
                    <a class="console" href="javascript:void(0)">控制台</a>
                    <a class="detail" href="javascript:void(0)">详情</a>
                    <div class="btn-group">
                        <a class="btn dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="javascript:void(0)">启动</a></li>
                            <li><a href="javascript:void(0)">停止</a></li>
                            <li><a href="javascript:void(0)">删除</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="javascript:void(0)">应用卸载</a></li>
                            <li><a href="javascript:void(0)">脚本配置</a></li>
                            <li><a href="javascript:void(0)">附加公网IP</a></li>
                        </ul>
                    </div>
                `
            }],
            data: this.state.data
        })

        this.$delete = $("#delete", this.root)
        this.$start = $("#start", this.root)
        this.$stop = $("#stop", this.root)
        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', ()=> {
            let selections = this.getIdSelections()
            this.$delete.prop('disabled', !selections.length)
            this.$start.prop('disabled', !selections.length)
            this.$stop.prop('disabled', !selections.length)
        })
        this.$delete.click(()=> {
            let ids = this.getIdSelections()
            this.$table.bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
            this.$delete.prop('disabled', true)
        })
        this.$start.click(()=> {
            let ids = this.getIdSelections()
            alert("start: " + JSON.stringify(ids))
            this.$start.prop('disabled', true)
        })
        this.$stop.click(()=> {
            let ids = this.getIdSelections()
            alert("stop: " + JSON.stringify(ids))
            this.$stop.prop('disabled', true)
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
        this.root = $("#nodes_index")
        this.loadData()
        this.renderTable()
    }
    addNode() {

    }
    render() {
        return (
            <div id="nodes_index">
                <div id="node_toolbar">
                    <a className="btn btn-default" id="start">启动</a>
                    <a className="btn btn-default ml5" id="stop">停止</a>
                    <a className="btn btn-danger ml5" id="delete">删除</a>
                    <a className="btn btn-default ml5" data-toggle="modal" data-target="#addNode">新增</a>
                    <Link to={`cloud/node/new`} className="btn btn-primary ml5">注册</Link>
                    <span className="ml10">
                        所属应用/服务：
                        <select id="applications_select" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {this.state.applicationsOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
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

                <div id="addNode" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">新增节点</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.addNode}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">计费方式：</label>
                                        <div className="col-sm-9">
                                            <BillingConfig />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">配置费用：</label>
                                        <div className="col-sm-9 infos">
                                            123 元
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">新增节点数量：</label>
                                        <div className="col-sm-9">
                                            <input type="number" className="form-control" placeholder="" /> 个
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default HistoryMixin(NodeIndex)

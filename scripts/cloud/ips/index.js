import request from "../../request"
import {areasOption} from "../../enums/areas"
import {statusOption} from "../../enums/node_status"
import BandwidthConfig from "../modules/bandwidthConfig"
const Link = ReactRouter.Link

class CloudIpIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    id: "1",
                    instance: 'eip-23g04brvo',
                    address: '134.15.15.16',
                    bandwidth: '固定带宽5MB',
                    status: '可以',
                    bind_instance: '--',
                    instance_type: '--',
                    create_time: '2015-12-10 12:34'
                }, {
                    id: "2",
                    instance: 'eip-23g04brvo',
                    address: '134.15.15.16',
                    bandwidth: '固定带宽5MB',
                    status: '可以',
                    bind_instance: '--',
                    instance_type: '--',
                    create_time: '2015-12-10 12:34'
                }, {
                    id: "3",
                    instance: 'eip-23g04brvo',
                    address: '134.15.15.16',
                    bandwidth: '固定带宽5MB',
                    status: '可以',
                    bind_instance: '--',
                    instance_type: '--',
                    create_time: '2015-12-10 12:34'
                }
            ],
            instance_type: [
                {
                    label: "实例类型1",
                    value: 1,
                },
                {
                    label: "实例类型2",
                    value: 2,
                }
            ],
            instances: [
                {
                    label: "实例1",
                    value: 1,
                },
                {
                    label: "实例2",
                    value: 2,
                }
            ]
        }
    }
    renderTable (data) {
        $("#area_types", this.root).select2().on("select2:select", (e) => {
            let area = e.params.data.id
            area = area == "all"? _.map(areasOption, 'label'): area
            this.$table.bootstrapTable('filterBy', {area : area})
        })
        $("#ip_status", this.root).select2().on("select2:select", (e) => {
            let status = e.params.data.id
            status = status == "all"? _.map(statusOption, 'label'): status
            this.$table.bootstrapTable('filterBy', {status : status})
        })
        $("select.select2dom", this.root).not("#area_types, #ip_status").select2()

        this.$table = $('#ip_table', this.root).bootstrapTable({
            columns: [
                {
                    checkbox: true
                }, {
                    field: 'id',
                    visible: false
                }, {
                    field: 'instance',
                    title: '实例ID'
                }, {
                    field: 'address',
                    title: 'IP地址'
                }, {
                    field: 'bandwidth',
                    title: '带宽'
                }, {
                    field: 'status',
                    title: '状态'
                }, {
                    field: "bind_instance",
                    title: '绑定实例'
                }, {
                    field: "instance_type",
                    title: '实例类型',
                    // sortable: true,
                }, {
                    field: "create_time",
                    title: '创建世界'
                }, {
                    field: 'operate',
                    title: '操作',
                    events: {
                        "click .bandwidth": (e, value, row, index) => {
                            // this.props.history.pushState(null, `/cloud/node/${row.nodeId}`)
                        },
                        "click .bind": (e, value, row, index) => {
                            // this.props.history.pushState(null, `/cloud/node/${row.nodeId}`)
                        },
                        "click .release": (e, value, row, index) => {
                            alert("释放ip " + row.id)
                        }
                    },
                    formatter: `
                        <a class="bandwidth" href="javascript:void(0)" data-toggle="modal" data-target="#bandwidth_edit">修改带宽</a>
                        <a class="bind" href="javascript:void(0)" data-toggle="modal" data-target="#ip_edit">绑定</a>
                        <a class="release" href="javascript:void(0)">释放</a>
                    `
                }
            ],
            data: this.state.data
        })
        this.$delete = $("#delete", this.root)
        this.$start = $("#start", this.root)
        this.$stop = $("#stop", this.root)
        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', () => {
            let selections = this.getIdSelections()
            this.$delete.prop('disabled', !selections.length)
            this.$start.prop('disabled', !selections.length)
            this.$stop.prop('disabled', !selections.length)
        })
        this.$delete.click(() => {
            let ids = this.getIdSelections()
            this.$table.bootstrapTable('remove', {field: 'id', values: ids});
            this.$delete.prop('disabled', true)
        })
        this.$start.click(() => {
            let ids = this.getIdSelections()
            alert("start: " + JSON.stringify(ids))
            this.$start.prop('disabled', true)
        })
        this.$stop.click(() => {
            let ids = this.getIdSelections()
            alert("stop: " + JSON.stringify(ids))
            this.$stop.prop('disabled', true)
        })
    }
    getIdSelections () {
        return $.map(this.$table.bootstrapTable('getSelections'), function(row) {
            return row.nodeId
        })
    }
    loadData () {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount () {
        this.root = $("#cloud_ip")
        this.loadData()
        this.renderTable()
    }
    editBandwidth () {

    }
    bindIp() {

    }
    render () {
        return(
            <div id="cloud_ip">
                <h2>公网IP</h2>
                <div id="ip_toolbar">
                    <Link className="btn btn-primary ml5" to={`/cloud/ip/new`}>申请公网IP</Link>
                    <span className="ml10">
                        地域：
                        <select id="area_types" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {areasOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                    <span className="ml10">
                        状态：
                        <select id="ip_status" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {statusOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="ip_table"
                    data-toolbar="#ip_toolbar"
                    data-search="true">
                </table>

                <div id="bandwidth_edit" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">修改带宽</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={:: this.editBandwidth}>
                                <div className="modal-body">
                                    <BandwidthConfig />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="ip_edit" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">绑定公网IP</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.bindIp}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">IP地址：</label>
                                        <div className="col-sm-9">
                                            <input type="name" className="form-control" placeholder="IP地址" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">实例类型：</label>
                                        <div className="col-sm-9">
                                            <select value={this.state.data.os_version} name="os_version" className="select2dom">
                                                {this.state.instance_type.map(function(option) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">实例：</label>
                                        <div className="col-sm-9">
                                            <select value={this.state.data.os_version} name="os_version" className="select2dom">
                                                {this.state.instances.map(function(option) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                            <p>只有处于运行中和已停止状态的云服务器实例可以绑定弹性公网IP</p>
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

export default CloudIpIndex

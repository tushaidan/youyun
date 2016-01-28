import request from "../../request"
import HistoryMixin from '../../history_mixin'
import {typesOption as netTypesOption} from "../../enums/net_types"
import {areasOption} from "../../enums/areas"
const Link = ReactRouter.Link

class CloudNet extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                name: ".6网段",
                networkConfId: 1,
                bandwidth: 1,
                cloudAccountId: 2,
                cloudAccountName: "cloudstack",
                createTime: null,
                description: "",
                envId: "",
                internetChargeType: 0,
                networkId: "86aa4885-6811-4ed7-a3dd-595833624db5",
                nodeNum: 2,
                proxyNodeStatus: 1,
                regionId: "46a1a2cb-dfb8-416d-b744-972b442c6402",
                securityGroupId: "",
                type: 1,
            }]
        }
    }
    renderTable() {
        $("#nettype_sel", this.root).select3("select2:select", (e)=> {
            let type = e.params.data.id
            type = type == "all"? _.map(netTypesOption, 'label'): type
            this.$table.bootstrapTable('filterBy', {type: type})
        })

        $("#areas_sel", this.root).select3("select2:select", (e)=> {
            let type = e.params.data.id
            type = type == "all"? _.map(areasOption, 'label'): type
            this.$table.bootstrapTable('filterBy', {type: type})
        })

        this.$delete = $("#delete", this.root)
        this.$table = $('#cloudnet_table', this.root).bootstrapTable({
            columns: [{
                checkbox: true
            }, {
                field: 'networkConfId',
                visible: false
            }, {
                field: 'name',
                title: '网络名称',
            }, {
                field: 'type',
                title: '网络'
            }, {
                field: 'cloudAccountName',
                title: '所属云'
            }, {
                field: "regionId",
                title: '地域'
            }, {
                field: "envId",
                title: '可用区域',
            }, {
                field: "internetChargeType",
                title: '交换机'
            }, {
                field: "securityGroupId",
                title: '安全组'
            }, {
                field: "proxyNodeStatus",
                title: '代理机'
            }, {
                field: "bandwidth",
                title: '带宽'
            }, {
                field: "nodeNum",
                title: '实例'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: {
                    "click .detail": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/cloud/net/${row.networkConfId}`)
                    },
                    "click .edit": (e, value, row, index)=> {
                        this.props.history.pushState(null, `/cloud/net/${row.networkConfId}/edit`)
                    },
                    "click .delete": (e, value, row, index)=> {
                        alert("delete!")
                    }
                },
                formatter: `
                    <a class="detail" href="javascript:void(0)">详情</a>
                    <a class="edit" href="javascript:void(0)">编辑</a>
                    <a class="delete" href="javascript:void(0)">删除</a>
                `
            }],
            data: this.state.data
        })

        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', ()=> {
            let selections = this.getIdSelections()
            this.$delete.prop('disabled', !selections.length)
        })
        this.$delete.click(()=> {
            let ids = this.getIdSelections()
            this.$table.bootstrapTable('remove', {
                field: 'networkConfId',
                values: ids
            })
            this.$delete.prop('disabled', true)
        })
    }
    getIdSelections() {
        return $.map(this.$table.bootstrapTable('getSelections'), function (row) {
            return row.networkConfId
        })
    }
    loadData() {
        request("clouds/networkconf").done(res => {
            this.setState({data: res})
        })
    }
    componentDidMount() {
        this.root = $("#cloudnet")
        this.loadData()
    }
    componentDidUpdate() {
        this.renderTable()
    }
    render() {
        return (
            <div id="cloudnet">
                <h2>云网络</h2>
                <div id="cloudnet_toolbar">
                    <Link to={`cloud/net/new`} className="btn btn-primary">新增</Link>
                    <a className="btn btn-danger ml10" id="delete">删除</a>
                    <span className="ml10">
                        区域：
                        <select id="areas_sel" value={this.state.area} className="select2dom">
                            <option value="all">全部</option>
                            {areasOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                    <span className="ml10">
                        网络类型：
                        <select id="nettype_sel" value={this.state.nettypes} className="select2dom">
                            <option value="all">全部</option>
                            {netTypesOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="cloudnet_table"
                    data-toolbar="#cloudnet_toolbar"
                    data-search="true">
                </table>
            </div>
        )
    }
}

export default HistoryMixin(CloudNet)

import request from "../request"
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class MemberAuths extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                id: "1",
                name: '角色1',
                module: "应用",
                cate: "类型1",
                desp: "描述1",
                status: "已启用",
            }, {
                id: "2",
                name: '角色2',
                module: "应用",
                cate: "类型1",
                desp: "描述1",
                status: "已启用",
            }, {
                id: "3",
                name: '角色3',
                module: "应用",
                cate: "类型1",
                desp: "描述1",
                status: "已启用",
            }],
            statusOption: [
                {
                    value: 1,
                    label: "已启动1"
                },
                {
                    value: 2,
                    label: "未启用"
                }
            ],
            app_sources: [
                {
                    app_name: "应用1",
                    app_id: "1",
                    sources:[
                        {
                            value: 1,
                            label: "资源1"
                        },
                        {
                            value: 2,
                            label: "资源2"
                        }
                    ]
                },
                {
                    app_name: "应用2",
                    app_id: "2",
                    sources:[
                        {
                            value: 3,
                            label: "资源3"
                        },
                        {
                            value: 4,
                            label: "资源4"
                        }
                    ]
                }
            ]
        }
    }
    renderTable() {
        $("#status_sel", this.root).select2().on("select2:select", (e)=> {
            let item = e.params.data.id
            item = item == "all"? _.map(levelOption, 'label'): item
            this.$table.bootstrapTable('filterBy', {status: item})
        })

        this.$table = $('#auths_table', this.root).bootstrapTable({
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                visible: false
            }, {
                field: 'name',
                title: '名称',
            }, {
                field: 'module',
                title: '模块'
            }, {
                field: 'cate',
                title: '类型'
            }, {
                field: 'desp',
                title: '描述'
            }, {
                field: 'status',
                title: '状态'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: {
                    "click .delete": (e, value, row, index)=> {
                        alert("delete " + row.id)
                    }
                },
                formatter: `
                    <a class="auth" href="javascript:void(0)" data-toggle="modal" data-target="#auth_edit">资源分配</a>
                `
            }],
            data: this.state.data
        })
    }
    getIdSelections() {
        return $.map(this.$table.bootstrapTable('getSelections'), function (row) {
            return row.id
        })
    }
    loadData() {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount() {
        this.root = $("#auths")
        this.loadData()
        $("select.select2dom", this.root).select2()
        this.renderTable()
        $('#auths_tab a').first().click()
    }
    roleNew(e) {

    }
    roleEdit(e) {

    }
    render() {
        return (
            <div id="auths">
                <h2>权限管理</h2>
                <div id="auths_toolbar">
                    <span className="ml10">
                        状态：
                        <select id="status_sel" className="select2dom">
                            <option value="all">全部</option>
                            {this.state.statusOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="auths_table"
                    data-toolbar="#auths_toolbar"
                    data-search="true">
                </table>

                <div className="modal fade" id="auth_edit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">资源分配</h4>
                            </div>

                            <div className="modal-body row" style={{paddingLeft:30}}>
                                <ul id="auths_tab" className="nav nav-pills nav-stacked col-md-3">
                                    {this.state.app_sources.map(function(item, i) {
                                        return <li><a data-target={`#app-${item.app_id}`} data-toggle="tab">{item.app_name}</a></li>
                                    })}
                                </ul>
                                <div className="tab-content col-md-9">
                                    {this.state.app_sources.map(function(item, i) {
                                        return <div className="tab-pane" id={`app-${item.app_id}`}>
                                            {item.sources.map(function(source, i) {
                                                return <div class="checkbox">
                                                    <label><input key={source.value} type="checkbox" value={source.value} /> {source.label}</label>
                                                </div>
                                            })}
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="submit" className="btn btn-primary">保存</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default HistoryMixin(MemberAuths)

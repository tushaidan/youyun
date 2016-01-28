import request from "../request"
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class MemberRoles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                id: "1",
                name: '角色1',
                level: 1,
                cate: "类型1",
                desp: "描述1",
                status: "已启用",
            }, {
                id: "2",
                name: '角色2',
                level: 1,
                cate: "类型1",
                desp: "描述1",
                status: "已启用",
            }, {
                id: "3",
                name: '角色3',
                level: 1,
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
            typeOption: [
                {
                    value: 1,
                    label: "sysadmin"
                },
                {
                    value: 2,
                    label: "business"
                }
            ],
            app_auths: [
                {
                    app_name: "应用1",
                    app_id: "1",
                    auths:[
                        {
                            value: 1,
                            label: "权限1"
                        },
                        {
                            value: 2,
                            label: "权限2"
                        }
                    ]
                },
                {
                    app_name: "应用2",
                    app_id: "2",
                    auths:[
                        {
                            value: 3,
                            label: "权限3"
                        },
                        {
                            value: 4,
                            label: "权限4"
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

        this.$delete = $("#delete", this.root)
        this.$table = $('#roles_table', this.root).bootstrapTable({
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                visible: false
            }, {
                field: 'name',
                title: '名称',
            }, {
                field: 'level',
                title: '等级'
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
                    <a class="edit" href="javascript:void(0)" data-toggle="modal" data-target="#role_edit">编辑</a>
                    <a class="auth" href="javascript:void(0)" data-toggle="modal" data-target="#auth_edit">权限分配</a>
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
                field: 'id',
                values: ids
            });
            this.$delete.prop('disabled', true)
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
        this.root = $("#roles")
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
            <div id="roles">
                <h2>部门管理</h2>
                <div id="roles_toolbar">
                    <a className="btn btn-primary" href="javascript:void(0)" data-toggle="modal" data-target="#role_new">新建</a>
                    <a className="btn btn-danger ml10" id="delete">删除</a>
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
                <table id="roles_table"
                    data-toolbar="#roles_toolbar"
                    data-search="true">
                </table>

                <div className="modal fade" id="role_new">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">新建角色</h4>
                            </div>

                            <form className="form-horizontal" onSubmit={::this.roleNew}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">名称：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" className="form-control" placeholder="名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">等级：</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="level" className="form-control" placeholder="等级" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">类型：</label>
                                        <div className="col-sm-10">
                                            <select id="level_sel" name="cate" className="select2dom">
                                                {this.state.typeOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                                })}
                                            </select>
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

                <div className="modal fade" id="role_edit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">编辑角色</h4>
                            </div>

                            <form className="form-horizontal" onSubmit={:: this.roleEdit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">名称：</label>
                                        <div className="col-sm-10">
                                            <input type="text" name="name" className="form-control" placeholder="名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">等级：</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="level" className="form-control" placeholder="等级" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">类型：</label>
                                        <div className="col-sm-10">
                                            <select id="level_sel" name="cate" className="select2dom">
                                                {this.state.typeOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                                })}
                                            </select>
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

                <div className="modal fade" id="auth_edit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">权限分配</h4>
                            </div>

                            <div className="modal-body row" style={{paddingLeft:30}}>
                                <ul id="auths_tab" className="nav nav-pills nav-stacked col-md-3">
                                    {this.state.app_auths.map(function(item, i) {
                                        return <li><a data-target={`#app-${item.app_id}`} data-toggle="tab">{item.app_name}</a></li>
                                    })}
                                </ul>
                                <div className="tab-content col-md-9">
                                    {this.state.app_auths.map(function(item, i) {
                                        return <div className="tab-pane" id={`app-${item.app_id}`}>
                                            {item.auths.map(function(auth, i) {
                                                return <div class="checkbox">
                                                    <label><input key={auth.value} type="checkbox" value={auth.value} /> {auth.label}</label>
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

export default HistoryMixin(MemberRoles)

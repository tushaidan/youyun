import request from "../request"
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class MemberDepartments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                id: "1",
                name: 'user1',
                email: "zxcasd@asd.com",
                mobile: "124435435123",
                department: "部门1",
                role: "角色1",
            }, {
                id: "2",
                name: 'user2',
                email: "zxcasd@asd.com",
                mobile: "124435435123",
                department: "部门1",
                role: "角色1",
            }, {
                id: "2",
                name: 'user3',
                email: "zxcasd@asd.com",
                mobile: "124435435123",
                department: "部门1",
                role: "角色1",
            }],
            departmentOption: [
                {
                    value: 1,
                    label: "部门1"
                },
                {
                    value: 2,
                    label: "部门2"
                }
            ],
            roles: [
                {
                    label: "角色1",
                    value: "1",
                },
                {
                    label: "角色2",
                    value: "2",
                },
                {
                    label: "角色3",
                    value: "3",
                }
            ],
            roles_sel: [
                {
                    value: "2",
                    label: "角色2"
                }
            ],
        }
    }
    renderTable() {
        this.$delete = $("#delete", this.root)
        this.$table = $('#users_table', this.root).bootstrapTable({
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                visible: false
            }, {
                field: 'name',
                title: '用户名',
            }, {
                field: 'email',
                title: '邮箱'
            }, {
                field: 'mobile',
                title: '电话'
            }, {
                field: 'department',
                title: '部门'
            }, {
                field: 'role',
                title: '角色'
            }, {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: {
                    "click .delete": (e, value, row, index)=> {
                        alert("delete " + row.id)
                    },
                    "click .reset_pwd": (e, value, row, index)=> {
                        alert("reset_pwd " + row.id)
                    }
                },
                formatter: `
                    <a class="edit" href="javascript:void(0)" data-toggle="modal" data-target="#user_edit">编辑</a>
                    <a class="reset_pwd">重置密码</a>
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
        this.root = $("#users")
        this.loadData()
        this.renderTable()
        $("select.select2dom", this.root).select2()
    }
    departmentNew(e) {

    }
    departmentEdit(e) {

    }
    roleAdd() {
        let item = _.findWhere(this.state.roles, {value: $("#roleSelect", this.root).val()})
        this.state.roles_sel.push(item)
        this.forceUpdate()
    }
    roleRemove(e) {
        let value = e.currentTarget.dataset.value
        confirm("确定删除？").done(()=> {
            let items = this.state.roles_sel.filter(function(item) {
                return item.value != value
            })
            this.setState({roles_sel: items})
        })
    }
    render() {
        return (
            <div id="users">
                <h2>用户管理</h2>
                <div id="users_toolbar">
                    <a className="btn btn-danger ml10" id="delete">删除</a>
                </div>
                <table id="users_table"
                    data-toolbar="#users_toolbar"
                    data-search="true">
                </table>

                <div className="modal fade" id="user_edit">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">编辑部门</h4>
                            </div>

                            <form className="form-horizontal" onSubmit={:: this.departmentEdit}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">用户名：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">邮箱：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">电话：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">部门：</label>
                                        <div className="col-sm-10">
                                            <select id="level_sel" className="select2dom">
                                                {this.state.departmentOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">角色：</label>
                                        <div className="col-sm-10">
                                            {this.state.roles_sel.map((option, i)=> {
                                                return <span key={option.value} className="mr10">{option.label}
                                                    <i data-value={option.value} className="glyphicon glyphicon-remove" onClick={::this.roleRemove}></i>
                                                </span>
                                            })}
                                            <select className="select2dom" id="roleSelect">
                                                {_.difference(this.state.roles, this.state.nodes_sel).map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                            <a className="glyphicon glyphicon-plus ml5" onClick={::this.roleAdd}></a>
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

export default HistoryMixin(MemberDepartments)

import request from "../request"
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class MemberDepartments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                id: "1",
                name: '开发部',
                level: 1,
                user_count: 3,
            }, {
                id: "2",
                name: '测试部',
                level: 1,
                user_count: 3,
            }, {
                id: "3",
                name: '运营部',
                level: 1,
                user_count: 2,
            }],
            levelOption: [
                {
                    value: 1,
                    label: "等级1"
                },
                {
                    value: 2,
                    label: "等级2"
                }
            ]
        }
    }
    renderTable() {
        $("#level_sel", this.root).select2().on("select2:select", (e)=> {
            let item = e.params.data.id
            item = item == "all"? _.map(levelOption, 'label'): item
            this.$table.bootstrapTable('filterBy', {level: item})
        })

        this.$delete = $("#delete", this.root)
        this.$table = $('#department_table', this.root).bootstrapTable({
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
                field: 'user_count',
                title: '成员数'
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
                    <a class="edit" href="javascript:void(0)" data-toggle="modal" data-target="#department_edit">编辑</a>
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
        this.root = $("#department")
        this.loadData()
        this.renderTable()
    }
    departmentNew(e) {

    }
    departmentEdit(e) {

    }
    render() {
        return (
            <div id="department">
                <h2>部门管理</h2>
                <div id="department_toolbar">
                    <a className="btn btn-primary" href="javascript:void(0)" data-toggle="modal" data-target="#department_new">新建</a>
                    <a className="btn btn-danger ml10" id="delete">删除</a>
                    <span className="ml10">
                        等级：
                        <select id="level_sel" className="select2dom">
                            <option value="all">全部</option>
                            {this.state.levelOption.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="department_table"
                    data-toolbar="#department_toolbar"
                    data-search="true">
                </table>

                <div className="modal fade" id="department_new">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">新建部门</h4>
                            </div>

                            <form className="form-horizontal" onSubmit={::this.departmentNew}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">名称：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="部门名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">等级：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="部门等级" />
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

                <div className="modal fade" id="department_edit">
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
                                        <label className="col-sm-2 control-label">名称：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="部门名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">等级：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="部门等级" />
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

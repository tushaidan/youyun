const Link = ReactRouter.Link

class CloudScripts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    id: "1",
                    name: 'istProcesses',
                    platform: 'linux',
                    type: 'Shell',
                    object: '节点',
                    create_time: '2015-12-10 12:34',
                    description: '----'
                }, {
                    id: "2",
                    name: 'istProcesses',
                    platform: 'linux',
                    type: 'Shell',
                    object: '节点',
                    create_time: '2015-12-10 12:34',
                    description: '----'
                }, {
                    id: "2",
                    name: 'istProcesses',
                    platform: 'linux',
                    type: 'Shell',
                    object: '节点',
                    create_time: '2015-12-10 12:34',
                    description: '----'
                }
            ],
            platforms: [
                {
                    label: "Linux",
                    value: 1,
                },
                {
                    label: "Windows",
                    value: 2,
                }
            ],
            objects: [
                {
                    label: "对象1",
                    value: 1,
                },
                {
                    label: "对象2",
                    value: 2,
                }
            ],
            types: [
                {
                    label: "类型1",
                    value: 1,
                },
                {
                    label: "类型2",
                    value: 2,
                }
            ]
        }
    }
    renderTable (data) {
        $("#scripts_platforms", this.root).select2().on("select2:select", (e) => {
            let item = e.params.data.id
            item = item == "all"? _.map(this.state.platforms, 'label'): item
            this.$table.bootstrapTable('filterBy', {platform : item})
        })
        $("#scripts_objects", this.root).select2().on("select2:select", (e) => {
            let item = e.params.data.id
            item = item == "all"? _.map(this.state.objects, 'label'): item
            this.$table.bootstrapTable('filterBy', {object : item})
        })
        $("#scripts_types", this.root).select2().on("select2:select", (e) => {
            let item = e.params.data.id
            item = item == "all"? _.map(this.state.types, 'label'): item
            this.$table.bootstrapTable('filterBy', {type : item})
        })

        this.$table = $('#scripts_table', this.root).bootstrapTable({
            columns: [
                {
                    checkbox: true
                }, {
                    field: 'id',
                    visible: false
                }, {
                    field: 'name',
                    title: '名称'
                }, {
                    field: 'platform',
                    title: '平台'
                }, {
                    field: 'type',
                    title: '类型'
                }, {
                    field: 'object',
                    title: '对象'
                }, {
                    field: "create_time",
                    title: '创建世界'
                }, {
                    field: "description",
                    title: '说明'
                }, {
                    field: 'operate',
                    title: '操作',
                    events: {
                        "click a.execute": (e, value, row, index) => {
                            this.props.history.pushState(null, `/cloud/script/${row.scriptId}/execute`)
                        },
                        "click a.view": (e, value, row, index) => {
                            this.props.history.pushState(null, `/cloud/script/${row.scriptId}`)
                        },
                        "click a.remove": (e, value, row, index) => {
                            alert("删除脚本 " + row.id)
                        }
                    },
                    formatter: `
                        <a class="execute" href="javascript:void(0)">执行</a>
                        <a class="view" href="javascript:void(0)">查看</a>
                        <a class="remove" href="javascript:void(0)">删除</a>
                    `
                }
            ],
            data: this.state.data
        })
        this.$remove = $("#remove", this.root)
        this.$execute = $("#execute", this.root)
        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', () => {
            let selections = this.getIdSelections()
            this.$remove.prop('disabled', !selections.length)
            this.$execute.prop('disabled', !selections.length)
        })
        this.$remove.click(() => {
            let ids = this.getIdSelections()
            this.$table.bootstrapTable('remove', {field: 'id', values: ids});
            this.$delete.prop('disabled', true)
        })
        this.$execute.click(() => {
            let ids = this.getIdSelections()
            alert("execute: " + JSON.stringify(ids))
            this.$start.prop('disabled', true)
        })
    }
    getIdSelections () {
        return $.map(this.$table.bootstrapTable('getSelections'), function(row) {
            return row.id
        })
    }
    loadData () {
        // request("triggerevents").done(data => {
        //     this.state.data = data
        // })
    }
    componentDidMount () {
        this.root = $("#cloud_scripts")
        this.loadData()
        this.renderTable()
    }
    editBandwidth () {

    }
    bindIp() {

    }
    render () {
        return(
            <div id="cloud_scripts">
                <h2>脚本库</h2>
                <div id="scripts_toolbar">
                    <Link className="btn btn-primary" to={`/cloud/script/new`}>新建脚本</Link>
                    <Link className="btn btn-primary ml5" to={`/cloud/script/execute`}>执行脚本</Link>
                    <a className="btn btn-danger ml5">删除脚本</a>
                    <a className="btn btn-default ml5">执行策略</a>
                    <span className="ml10">
                        平台：
                        <select id="scripts_platforms" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {this.state.platforms.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                    <span className="ml10">
                        对象：
                        <select id="scripts_objects" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {this.state.objects.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                    <span className="ml10">
                        类型：
                        <select id="scripts_types" value={this.state.event} className="select2dom">
                            <option value="all">全部</option>
                            {this.state.types.map(function(option, i) {
                                return <option key={option.value} value={option.label}>{option.label}</option>
                            })}
                        </select>
                    </span>
                </div>
                <table id="scripts_table"
                    data-toolbar="#scripts_toolbar"
                    data-search="true">
                </table>

            </div>
        )
    }
}

export default CloudScripts

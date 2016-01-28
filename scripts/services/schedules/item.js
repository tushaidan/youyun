import request from "../../request"
const Link = ReactRouter.Link

class AppScheduleItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "作业调度名称",
            nodes: "节点1、节点2",
            script: "脚本1、脚本2",
            type: "触发",
            logs: [{
                    "time": "2015-11-12 23:23",
                    "nodes": "节点c(10.2.2.1)",
                    "operater": "user1",
                    "result": "结果3"
                }, {
                    "time": "2015-11-11 23:23",
                    "nodes": "节点c(10.2.2.34)",
                    "operater": "user2",
                    "result": "结果3"
                }, {
                    "time": "2015-11-12 34:23",
                    "nodes": "节点b(10.2.2.12)",
                    "operater": "user4",
                    "result": "结果3"
                }, {
                    "time": "2015-11-04 23:23",
                    "nodes": "节点a(10.2.2.45)",
                    "operater": "admin",
                    "result": "结果3"
                }
            ]
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
                <h2>作业调度：{this.state.name}
                    <Link className="fn-right" to={`/app/${this.props.params.appId}/schedules`}>返回作业调度列表</Link>
                </h2>
                <div className="row infos">
                    <div className="col-md-2">
                        调度名称：
                    </div>
                    <div className="col-md-4">
                        {this.state.name}
                    </div>
                    <div className="col-md-2">
                        脚本名称：
                    </div>
                    <div className="col-md-4">
                        {this.state.script}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-2">
                        执行节点：
                    </div>
                    <div className="col-md-4">
                        {this.state.nodes}
                    </div>
                    <div className="col-md-2">
                        执行方式：
                    </div>
                    <div className="col-md-4">
                        {this.state.type}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        脚本内容：
                    </div>
                    <div className="col-md-10" id="scripts_tab">
                        <ul className="nav nav-tabs">
                            <li className="active"><a href="#script1" data-toggle="tab">脚本1</a></li>
                            <li><a href="#script2" data-toggle="tab">脚本2</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="script1">脚本1内容……</div>
                            <div className="tab-pane" id="script2">脚本2内容……</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        执行节点：
                    </div>
                    <div className="col-md-10">
                        <div id="schedules_log_table"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppScheduleItem

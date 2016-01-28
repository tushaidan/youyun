import request from "../../request"
const Link = ReactRouter.Link

class AppScheduleEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                type: 1
            },
            nodes: [
                {
                    value: "1",
                    label: "节点1"
                },{
                    value: "2",
                    label: "节点2"
                },{
                    value: "3",
                    label: "节点3"
                }
            ],
            nodes_sel: [
                {
                    value: "4",
                    label: "节点4"
                }
            ],
            scripts: [
                {
                    value: "1",
                    label: "脚本1"
                },{
                    value: "2",
                    label: "脚本2"
                },{
                    value: "3",
                    label: "脚本3"
                }
            ],
            scripts_sel: [
                {
                    value: "4",
                    label: "脚本4"
                }
            ],
            events: [
                {
                    value: "1",
                    label: "事件1"
                },{
                    value: "2",
                    label: "事件2"
                },{
                    value: "3",
                    label: "事件3"
                }
            ]
        }
    }
    componentDidMount () {
        this.root = $("#schedules_edit")
        $("select.select2dom", this.root).select2()
    }
    onType(value, e) {
        this.state.form.type = value
        this.forceUpdate()
    }
    actionSub(e) {

    }
    nodeAdd() {
        let node = _.findWhere(this.state.nodes, {value: $("#nodeSelect", this.root).val()})
        this.state.nodes_sel.push(node)
        this.forceUpdate()
    }
    nodeRemove(e) {
        let value = e.currentTarget.dataset.value
        confirm("确定删除？").done(()=> {
            let nodes = this.state.nodes_sel.filter(function(item) {
                return item.value != value
            })
            this.setState({nodes_sel: nodes})
        })
    }
    scriptAdd() {
        let script = _.findWhere(this.state.scripts, {value: $("#scriptSelect", this.root).val()})
        this.state.scripts_sel.push(script)
        this.forceUpdate()
    }
    scriptRemove(e) {
        let value = e.currentTarget.dataset.value
        confirm("确定删除？").done(()=> {
            let scripts = this.state.scripts_sel.filter(function(item) {
                return item.value != value
            })
            this.setState({scripts_sel: scripts})
        })
    }
    render () {
        let scripts_pre = _.difference(this.state.scripts, this.state.scripts_sel)
        let nodes_pre = _.difference(this.state.nodes, this.state.nodes_sel)
        return(
            <div id="schedules_edit">
                <h2>添加作业调度
                    <Link className="fn-right" to={`/app/${this.props.params.appId}/schedules`}>返回作业调度列表</Link>
                </h2>
                <form className="form-horizontal" onSubmit={::this.actionSub}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">脚本：</label>
                        <div className="col-sm-10">
                            {this.state.scripts_sel.map((option, i)=> {
                                return <span key={option.value}>{option.label}
                                    <i data-value={option.value} className="glyphicon glyphicon-remove" onClick={::this.scriptRemove}></i>
                                </span>
                            })}
                            <select value={this.state.form.script} className="select2dom" id="scriptSelect">
                                {scripts_pre.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="glyphicon glyphicon-plus ml5" onClick={::this.scriptAdd}></a>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">节点：</label>
                        <div className="col-sm-10">
                            {this.state.nodes_sel.map((option, i)=> {
                                return <span key={option.value}>{option.label}
                                    <i data-value={option.value} className="glyphicon glyphicon-remove" onClick={::this.nodeRemove}></i>
                                </span>
                            })}
                            <select value={this.state.form.node} className="select2dom" id="nodeSelect">
                                {nodes_pre.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="glyphicon glyphicon-plus ml5" onClick={::this.nodeAdd}></a>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">执行方式：</label>
                        <div className="col-sm-10">
                            <ReactRadioGroup name="type" value={this.state.form.type} onChange={::this.onType}>
                                <label className="radio-inline">
                                    <input type="radio" name="type" value="1" /> 轮询
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="type" value="2" /> 定时
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="type" value="3" /> 触发
                                </label>
                            </ReactRadioGroup>
                        </div>
                    </div>
                    <div className={this.state.form.type == 3? "form-group": "fn-none"}>
                        <div className="col-sm-offset-2 col-sm-10">
                            触发事件：
                            <select value={this.state.form.event} name="event" className="select2dom">
                                {this.state.events.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <Link to={`app/${this.props.params.appId}/schedules`} className="btn btn-default">取消</Link>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AppScheduleEdit

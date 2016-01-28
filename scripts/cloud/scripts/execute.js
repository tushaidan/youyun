import request from "../../request"
const Link = ReactRouter.Link

class CloudScriptExecute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scripts: [
                {
                    label: "脚本1",
                    value: 1,
                },
                {
                    label: "脚本2",
                    value: 2,
                },
                {
                    label: "脚本3",
                    value: 3,
                }
            ],
            apps_services: [
                {
                    label: "服务1",
                    value: 1,
                },
                {
                    label: "服务1",
                    value: 2,
                },
                {
                    label: "应用1",
                    value: 3,
                },
                {
                    label: "应用2",
                    value: 4,
                }
            ],
            nodes: [
                {
                    label: "节点1",
                    value: "1",
                },
                {
                    label: "节点2",
                    value: "2",
                },
                {
                    label: "节点3",
                    value: "3",
                }
            ],
            nodes_sel: [
                {
                    value: "2",
                    label: "节点2"
                }
            ],
            data: {

            }
        }
    }
    componentDidMount() {
        this.root = $("#cloud_script_new")
        $("select.select2dom", this.root).select2()
    }
    submit(e) {

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
    render() {
        return (
            <div id="cloud_script_new">
                <h2>执行脚本脚本
                    <Link className="fn-right" to={`/cloud/scripts`}>返回脚本库列表</Link>
                </h2>
                <form className="form-horizontal mt20" onSubmit={::this.submit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">脚本：</label>
                        <div className="col-sm-10">
                            <select id="scripts_platforms" value={this.state.event} className="select2dom">
                                {this.state.scripts.map(function(option, i) {
                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">应用&服务：</label>
                        <div className="col-sm-10">
                            <select id="scripts_platforms" value={this.state.event} className="select2dom">
                                {this.state.apps_services.map(function(option, i) {
                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">节点：</label>
                        <div className="col-sm-10">
                            {this.state.nodes_sel.map((option, i)=> {
                                return <span key={option.value} className="mr10">{option.label}
                                    <i data-value={option.value} className="glyphicon glyphicon-remove" onClick={::this.nodeRemove}></i>
                                </span>
                            })}
                            <select className="select2dom" id="nodeSelect">
                                {_.difference(this.state.nodes, this.state.nodes_sel).map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="glyphicon glyphicon-plus ml5" onClick={::this.nodeAdd}></a>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <Link to={`/cloud/ips`} className="btn btn-default">取消</Link>
                            <input type="submit" className="btn btn-primary ml10" value="执行"/>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <label className="col-sm-2 control-label">执行信息：</label>
                    <div className="col-sm-10">
                        <pre dangerouslySetInnerHTML={{__html: `
# 打印进程信息
# 打印进程信息
# 打印进程信息
# 打印进程信息
echo '---------进程信息-----------'
get-process

# 打印服务信息
echo '---------服务信息-----------'
get-service
                        `}}></pre>
                    </div>
                </div>
            </div>
        )
    }
}

export default CloudScriptExecute

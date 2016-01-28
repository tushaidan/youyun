import request from "../../request"
const Link = ReactRouter.Link

class CloudScriptNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
    onChangeArea(value, e) {
        this.setState({area: value})
    }
    render() {
        return (
            <div id="cloud_script_new">
                <h2>添加脚本
                    <Link className="fn-right" to={`/cloud/scripts`}>返回脚本库列表</Link>
                </h2>
                <form className="form-horizontal mt20" onSubmit={::this.submit}>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">名称：</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" className="form-control" placeholder="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">平台：</label>
                        <div className="col-sm-10">
                            <select id="scripts_platforms" value={this.state.event} className="select2dom">
                                {this.state.platforms.map(function(option, i) {
                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">类型：</label>
                        <div className="col-sm-10">
                            <select id="scripts_platforms" value={this.state.event} className="select2dom">
                                {this.state.types.map(function(option, i) {
                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">对象：</label>
                        <div className="col-sm-10">
                            <select id="scripts_platforms" value={this.state.event} className="select2dom">
                                {this.state.objects.map(function(option, i) {
                                    return <option key={option.value} value={option.label}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">内容：</label>
                        <div className="col-sm-10">
                            <textarea name="content" className="form-control" rows="4" ></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">超时设置</label>
                        <div className="col-sm-10">
                            <input type="number" name="overtime" className="form-control" /> s
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-10">
                            <Link to={`/cloud/ips`} className="btn btn-default">取消</Link>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default CloudScriptNew

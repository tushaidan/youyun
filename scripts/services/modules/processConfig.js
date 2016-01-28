import request from "../../request"
import {eventsOption} from "../../enums/delivery_events"

class ProcessConfig extends React.Component {
    static steps = ["服务安装", "服务启动", "服务停止", "服务卸载"];
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            data: {}
        }
    }
    actionStep(e) {
        this.setState({step: e.currentTarget.dataset.step})
    }
    addScriptSub(e) {
        e.preventDefault()
        //request("/process", "POST", _.serializeForm(e.currentTarget)).done(data => {
            $('#addScript').modal('hide')
            alert("保存成功！")
        //})
    }
    editScript() {
        $('#addScript').modal('show')
    }
    removeScript() {
        confirm("确定删除？").done(function(){
            alert("已删除。")
        })
    }
    render() {
        return (
            <div id="process_config">
                <ol className="breadcrumb">
                    {ProcessConfig.steps.map((item, i)=> {
                        return <li key={i}><a onClick={::this.actionStep} data-step={i} className={this.state.step == i? "active": ""}>{item}</a></li>
                    })}
                </ol>

                <section className={this.state.step == 0? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[0]}</h4>
                    <div className="fn-tar">
                        <a className="btn btn-primary" data-toggle="modal" data-target="#addScript">添加脚本策略</a>
                    </div>
                    <p>应用安装前执行</p>
                    <ul className="configs">
                        <li>
                            Apach服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil" onClick={::this.editScript}></i>
                            <i className="glyphicon glyphicon-trash" onClick={::this.removeScript}></i>
                        </li>
                    </ul>
                    <p>应用安装后执行</p>
                    <ul className="configs">
                        <li>Apach服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil"></i>
                            <i className="glyphicon glyphicon-trash"></i>
                        </li>
                    </ul>
                </section>

                <section className={this.state.step == 1? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[1]}</h4>
                    <div className="fn-tar">
                        <a className="btn btn-primary" data-toggle="modal" data-target="#addScript">添加脚本策略</a>
                    </div>
                    <p>应用安装前执行</p>
                    <ul className="configs">
                        <li>
                            aaaa服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil" onClick={::this.editScript}></i>
                            <i className="glyphicon glyphicon-trash" onClick={::this.removeScript}></i>
                        </li>
                    </ul>
                    <p>应用安装后执行</p>
                    <ul className="configs">
                        <li>aaaa服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil"></i>
                            <i className="glyphicon glyphicon-trash"></i>
                        </li>
                    </ul>
                </section>

                <section className={this.state.step == 2? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[5]}</h4>
                    <div className="fn-tar">
                        <a className="btn btn-primary" data-toggle="modal" data-target="#addScript">添加脚本策略</a>
                    </div>
                    <p>应用安装前执行</p>
                    <ul className="configs">
                        <li>
                            xxxx服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil" onClick={::this.editScript}></i>
                            <i className="glyphicon glyphicon-trash" onClick={::this.removeScript}></i>
                        </li>
                    </ul>
                    <p>应用安装后执行</p>
                    <ul className="configs">
                        <li>xxxx服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil"></i>
                            <i className="glyphicon glyphicon-trash"></i>
                        </li>
                    </ul>
                </section>

                <section className={this.state.step == 3? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[6]}</h4>
                    <div className="fn-tar">
                        <a className="btn btn-primary" data-toggle="modal" data-target="#addScript">添加脚本策略</a>
                    </div>
                    <p>应用安装前执行</p>
                    <ul className="configs">
                        <li>
                            zzzz服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil" onClick={::this.editScript}></i>
                            <i className="glyphicon glyphicon-trash" onClick={::this.removeScript}></i>
                        </li>
                    </ul>
                    <p>应用安装后执行</p>
                    <ul className="configs">
                        <li>zzzz服务自动设置脚本
                            <i className="glyphicon glyphicon-pencil"></i>
                            <i className="glyphicon glyphicon-trash"></i>
                        </li>
                    </ul>
                </section>

                <div id="addScript" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">添加脚本策略</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.addScriptSub}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">触发事件</label>
                                        <div className="col-sm-10">
                                            <select name="event" className="select2dom">
                                                {eventsOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本名称</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="脚本名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本内容</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" name="content" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">执行顺序</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" placeholder="" />
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

export default ProcessConfig

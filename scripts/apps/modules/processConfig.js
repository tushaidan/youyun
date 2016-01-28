import request from "../../request"
import {eventsOption} from "../../enums/delivery_events"

class ProcessConfig extends React.Component {
    static steps = ["应用安装", "应用启动", "应用包构建", "应用包部署", "应用包启动", "应用停止", "应用卸载"];
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            addForm: {},
            editForm: {},
            event0_scripts: [],
            event1_scripts: [],
            event2_scripts: [],
            event3_scripts: [],
            event4_scripts: [],
            event5_scripts: [],
            event6_scripts: [],
            event7_scripts: []
        }
    }
    actionStep(e) {
        this.setState({step: e.currentTarget.dataset.step})
    }
    subProp() {
        let scripts = []
        eventsOption.map((option, i)=> {
            scripts = _.concat(scripts, this.state[`event${option.value}_scripts`])
        })
        scripts.forEach((item)=> {
            item.triggerEventId = item.type //dirty
        })
        this.props.setState({scripts: scripts})
    }
    addScriptSub(e) {
        e.preventDefault()
        let data = _.serializeForm(e.target)
        // request("scripts", "POST", data).done((res) => {
            $('#addScriptForm').modal('hide')
            alert("保存成功！")
            data.scriptFrontId = "script_" + Math.floor(Math.random()*100) // dirty
            this.state[`event${data.type}_scripts`].push(data)
            this.forceUpdate()
            this.subProp()
        // })
    }
    editScript(e) {
        let data = e.target.dataset
        let form = _.find(this.state[`event${data.type}_scripts`], {scriptFrontId: data.id})
        this.setState({editForm: form})
        $('#editScriptForm').modal('show')
    }
    editScriptSub(e) {
        e.preventDefault()
        let data = _.serializeForm(e.target)
        // request("scripts", "PUT", data).done(res => {
            $('#editScriptForm').modal('hide')
            alert("保存成功！")
            let scripts = this.state[`event${data.type}_scripts`]
            let index = scripts.findIndex(x => x.scriptFrontId == data.scriptFrontId)
            scripts[index] = data
            this.forceUpdate()
            this.subProp()
        // })
    }
    removeScript(e) {
        confirm("确定删除？").done(function() {
            let dataset = e.target.dataset
            // request("scripts/" + dataset.id, "DELETE").done(res => {
                alert("已删除。")
                let scripts = this.state[`event${dataset.type}_scripts`]
                let index = scripts.findIndex(x => x.scriptFrontId == dataset.id)
                scripts.splice(index, 1)
                this.forceUpdate()
                this.subProp()
            // })
        })
    }
    componentDidMount() {
        this.root = $("#process_config")
        let _this = this
        $("a.add_script", this.root).on("click", function() {
            let addForm = _this.state.addForm
            addForm.type = $(this).attr("data-event")
            addForm.name = ""
            addForm.content = ""
            addForm.executeOrder = ""
            _this.setState({addForm: addForm})
        })
    }
    addInputChange(e) {
        this.state.addForm[e.target.name] = e.target.value
        this.forceUpdate()
    }
    editInputChange(e) {
        this.state.editForm[e.target.name] = e.target.value
        this.forceUpdate()
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
                    <p>应用安装前</p>
                    <ul className="configs">
                        {this.state.event0_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={0} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={0} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="0">添加</a>
                    </div>

                    <p>应用安装后</p>
                    <ul className="configs">
                        {this.state.event1_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={1} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={1} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="1">添加</a>
                    </div>
                </section>

                <section className={this.state.step == 1? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[1]}</h4>
                    <p>应用启动前</p>
                    <ul className="configs">
                        {this.state.event2_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={2} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={2} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="2">添加</a>
                    </div>

                    <p>应用启动后</p>
                    <ul className="configs">
                        {this.state.event3_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={3} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={3} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="3">添加</a>
                    </div>
                </section>

                <section className={this.state.step == 2? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[2]}</h4>
                </section>

                <section className={this.state.step == 3? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[3]}</h4>
                </section>

                <section className={this.state.step == 4? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[4]}</h4>
                </section>

                <section className={this.state.step == 5? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[5]}</h4>
                    <p>应用停止前</p>
                    <ul className="configs">
                        {this.state.event4_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={4} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={4} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="4">添加</a>
                    </div>

                    <p>应用停止后</p>
                    <ul className="configs">
                        {this.state.event5_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={5} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={5} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="5">添加</a>
                    </div>
                </section>

                <section className={this.state.step == 6? "": "fn-none"}>
                    <h4>{ProcessConfig.steps[6]}</h4>
                    <p>应用卸载前</p>
                    <ul className="configs">
                        {this.state.event6_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={6} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={6} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="6">添加</a>
                    </div>

                    <p>应用卸载后</p>
                    <ul className="configs">
                        {this.state.event7_scripts.map((item, i)=>{
                            return <li key={i}>
                                {item.name}
                                <i className="glyphicon glyphicon-pencil" data-id={item.scriptFrontId} data-type={7} onClick={::this.editScript}></i>
                                <i className="glyphicon glyphicon-trash" data-id={item.scriptFrontId} data-type={7} onClick={::this.removeScript}></i>
                            </li>
                        })}
                    </ul>
                    <div className="fn-tar">
                        <a className="btn btn-primary add_script" data-toggle="modal" data-target="#addScriptForm" data-event="7">添加</a>
                    </div>
                </section>

                <div id="addScriptForm" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">添加脚本策略</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.addScriptSub}>
                                <div className="modal-body">
                                    {/*
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">触发事件</label>
                                            <div className="col-sm-10">
                                                <select name="type" className="select2dom">
                                                    {eventsOption.map(function(option, i) {
                                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    */}
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本名称</label>
                                        <div className="col-sm-10">
                                            <input type="name" name="name" className="form-control" value={this.state.addForm.name} placeholder="脚本名称" onChange={::this.addInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本内容</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" name="content" rows="3" value={this.state.addForm.content} onChange={::this.addInputChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">执行顺序</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="executeOrder" className="form-control" placeholder="" value={this.state.addForm.executeOrder} onChange={::this.addInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="hidden" name="type" value={this.state.addForm.type} />
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="editScriptForm" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">编辑脚本策略</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.editScriptSub}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本名称</label>
                                        <div className="col-sm-10">
                                            <input type="name" name="name" value={this.state.editForm.name} className="form-control" placeholder="脚本名称" onChange={::this.editInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">脚本内容</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" value={this.state.editForm.content} name="content" rows="3" onChange={::this.editInputChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">执行顺序</label>
                                        <div className="col-sm-10">
                                            <input type="number" name="executeOrder" value={this.state.editForm.executeOrder} className="form-control" placeholder="" onChange={::this.editInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="hidden" name="type" value={this.state.editForm.type} />
                                    <input type="hidden" name="scriptFrontId" value={this.state.editForm.scriptFrontId} />
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

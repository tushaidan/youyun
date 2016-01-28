import {scmOption} from "../enums/scm"

class Delivery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 1,
            data: {}
        }
    }
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#delivery_form'))
        $("#delivery_form select.select2dom").select2()
    }
    onSubmit(e) {
        e.preventDefault()
        if (!_.isEmpty($("#delivery_form").data("validator").invalid)) return
        request("delivery", "POST", _.serializeForm(e.currentTarget)).done(data => {
            alert("更新完成！")
        })
    }
    actionStep(event) {
        this.setState({step: event.currentTarget.dataset.step})
    }
    render() {
        return (
            <form id="delivery_form" className="form-horizontal mt20" onSubmit={::this.onSubmit} noValidate="novalidate">
                <legend>代码仓库配置</legend>
                <div className="form-group">
                    <label className="col-sm-2 control-label">仓库</label>
                    <div className="col-sm-10">
                        <select name="tech_version" className="select2dom">
                            {scmOption.map(function(option, i) {
                                return <option key={option.value} value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">URL：</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="col-sm-2 control-label">用户名</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="username" placeholder="用户名"
                            data-val="true" data-val-required="用户名是必填项." />
                        <span className="field-validation-valid" data-valmsg-for="username" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-sm-2 control-label">密码</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" placeholder="密码"
                            data-val="true" data-val-required="密码是必填项." />
                        <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                    </div>
                </div>

                <legend>交付过程配置</legend>
                <ol className="breadcrumb">
                    <li><a onClick={::this.actionStep} data-step="1" className={this.state.step == 1? "active": ""}>应用安装</a></li>
                    <li><a onClick={::this.actionStep} data-step="2" className={this.state.step == 2? "active": ""}>应用启动</a></li>
                    <li><a onClick={::this.actionStep} data-step="3" className={this.state.step == 3? "active": ""}>应用包构建</a></li>
                    <li><a onClick={::this.actionStep} data-step="4" className={this.state.step == 4? "active": ""}>应用包部署</a></li>
                    <li><a onClick={::this.actionStep} data-step="5" className={this.state.step == 5? "active": ""}>应用包启动</a></li>
                    <li><a onClick={::this.actionStep} data-step="6" className={this.state.step == 6? "active": ""}>应用停止</a></li>
                    <li><a onClick={::this.actionStep} data-step="7" className={this.state.step == 7? "active": ""}>应用卸载</a></li>
                </ol>
                <section className={this.state.step == 1? "": "fn-none"}>
                    <div className="form-group">
                        <label htmlFor="username" className="col-sm-2 control-label">安装前执行脚本</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" name="perscripts" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="col-sm-2 control-label">安装后执行脚本</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" name="afterscripts" />
                        </div>
                    </div>
                </section>

                <section className={this.state.step == 2? "": "fn-none"}>
                    应用启动
                </section>

                <section className={this.state.step == 3? "": "fn-none"}>
                    应用包构建
                </section>

                <section className={this.state.step == 4? "": "fn-none"}>
                    应用包部署
                </section>

                <section className={this.state.step == 5? "": "fn-none"}>
                    应用包启动
                </section>

                <section className={this.state.step == 6? "": "fn-none"}>
                    应用停止
                </section>

                <section className={this.state.step == 7? "": "fn-none"}>
                    应用卸载
                </section>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">提交</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Delivery

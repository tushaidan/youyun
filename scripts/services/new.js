import request from "../request"
import Upload from "../modules/upload"
import HistoryMixin from '../history_mixin'
import ParametersTable from '../modules/parametersTable'
import StoreConfig from '../modules/storeConfig'
import ProcessConfig from './modules/processConfig'
import ElasticityConfig from "../modules/elasticityConfig"
import BillingConfig from "../modules/billingConfig"
import Pies from "../charts/pies"
import {scmOption} from "../enums/scm"

class ServiceNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appid: "xzfasfdfdsfasdqwrwfsdfsdf",
            cost: 0,
            data: [],
            step: 1,
            formStep: 1,
            tech_name: "Java",
            os_options: [],
            os_versions: [],
            cloud_options: [],
            net_options: [],
            version_options: [],
            category_options: [],
            tech_version_options: [],
            cpu_options: [],
            memory_options: [],
            total: [{
                value: 70,
                legend: "完成量"
            }],
            step_error: [{
                step: 1,
                info: "资源不足"
            },{
                step: 3,
                info: "资源不足3"
            }]
        }
    }
    loadEnum() {
        $.ajax({
            url: "/mock/enums/os_options.json",
            success: function(d) {
                this.setState({"os_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/centos_versions.json",
            success: function(d) {
                this.setState({"os_versions": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/cloud_options.json",
            success: function(d) {
                this.setState({"cloud_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/net_options.json",
            success: function(d) {
                this.setState({"net_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/version_options.json",
            success: function(d) {
                this.setState({"version_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/category_options.json",
            success: function(d) {
                this.setState({"category_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/tech_version_options.json",
            success: function(d) {
                this.setState({"tech_version_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/cpu_options.json",
            success: function(d) {
                this.setState({"cpu_options": d})
            }.bind(this)
        })
        $.ajax({
            url: "/mock/enums/memory_options.json",
            success: function(d) {
                this.setState({"memory_options": d})
            }.bind(this)
        })
    }
    componentDidUpdate() {
        // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
        // This method is not called for the initial render.
        let app_new = $("#app_new")
        $("select.select2dom", app_new).select2()
        let _this = this
        $('[data-toggle="popover"]', app_new).popover({html: true}).popover('show')
            .parent().delegate('a.retry', 'click', function() {
                _this.setState({step: parseInt($(this).attr("step"))})
            })
    }
    componentDidMount() {
        this.loadEnum()
        new ZeroClipboard(document.getElementById("copy-button")).on("aftercopy", function(e) {
            alert("复制成功: " + e.data["text/plain"])
        })
        this.componentDidUpdate()

        if (this.props.location.query.step)
            this.setState({step: parseInt(this.props.location.query.step), formStep: parseInt(this.props.location.query.step)})
    }
    actionSub1(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 2, step: 2})
    }
    actionSub2(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 3, step: 3})
    }
    actionSub3(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 4, step: 4})
    }
    actionSub4(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 5, step: 5})
    }
    actionSub5(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 6, step: 6})
    }
    actionSub6(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 7, step: 7})
    }
    actionSub7(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 8, step: 8})
    }
    actionSub8(e) {
        e.preventDefault()
        let data = this.state.data
        Object.assign(data, _.serializeForm(e.currentTarget))
        this.setState({data: data, formStep: 9, step: 9})
    }
    actionSubDone(e) {
        e.preventDefault()
        this.setState({formStep: 10, step: 10})
        // request("/applications", "POST", this.state.data).done(data => {
        //     this.props.history.pushState(null, `/apps`)
        // })
    }
    actionSave() {
        alert("保存成功！")
    }
    actionStep(e) {
        if (this.state.formStep >= e.currentTarget.dataset.step || e.currentTarget.dataset.unform == "true")
            this.setState({step: e.currentTarget.dataset.step})
    }
    render() {
        let colClasse = "col-lg-10 col-md-9 form-section"
        return (
            <div id="app_new" className="row thumbnails mt40">
                <div className={this.state.step < 10? "col-lg-2 col-md-3": "fn-none"} id="leftStep">
                    <ol>
                        <li onClick={::this.actionStep} data-step="1" className={this.state.step == 1? "active": ""}>
                            <i className={this.state.step < 1? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            设置服务信息
                        </li>
                        <li onClick={::this.actionStep} data-step="2" className={this.state.step == 2? "active": ""}>
                            <i className={this.state.step < 2? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置服务参数
                        </li>
                        <li onClick={::this.actionStep} data-step="3" className={this.state.step == 3? "active": ""}>
                            <i className={this.state.step < 3? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置代码仓库
                        </li>
                        <li onClick={::this.actionStep} data-step="4" className={this.state.step == 4? "active": ""}>
                            <i className={this.state.step < 4? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            分配部署分区
                        </li>
                        <li onClick={::this.actionStep} data-step="5" className={this.state.step == 5? "active": ""}>
                            <i className={this.state.step < 5? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置部署实例
                        </li>
                        <li onClick={::this.actionStep} data-step="6" className={this.state.step == 6? "active": ""}>
                            <i className={this.state.step < 6? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置服务脚本
                        </li>
                        <li onClick={::this.actionStep} data-step="7" className={this.state.step == 7? "active": ""}>
                            <i className={this.state.step < 7? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置弹性策略
                        </li>
                    </ol>
                </div>
                <section className={this.state.step == 1
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub1}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">名称</label>
                            <div className="col-sm-10">
                                <input type="text" name="name" className="form-control" placeholder="名称" value={this.state.data.appName}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">LOGO</label>
                            <div className="col-sm-10">
                                <Upload />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">应用版本</label>
                            <div className="col-sm-10">
                                <select value={this.state.data.version} name="version" className="select2dom">
                                    {this.state.version_options.map(function(option, i) { // http://stackoverflow.com/a/21736116
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">应用类型</label>
                            <div className="col-sm-10">
                                <select value={this.state.data.category} name="category" className="select2dom">
                                    {this.state.category_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">{this.state.tech_name}版本</label>
                            <div className="col-sm-10">
                                <select value={this.state.data.tech_version} name="tech_version" className="select2dom">
                                    {this.state.tech_version_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">描述</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" name="describe" rows="3">{this.state.data.describe}</textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <input type="submit" className="btn btn-primary" value="下一步"/>
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 2
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-inline">
                        <ParametersTable />
                        <div className="form-group mt10">
                            <a onClick={::this.actionStep} data-step="1" className="btn btn-default">上一步</a>
                            <a onClick={::this.actionSub2} className="btn btn-primary ml10">下一步</a>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 3
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub3}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">应用标识ID</label>
                            <div className="col-sm-10" style={{lineHeight: '32px'}}>
                                {this.state.appid}
                                <a id="copy-button" data-clipboard-text={this.state.appid} title="Click to copy me.">复制到剪贴板</a>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">仓库</label>
                            <div className="col-sm-10">
                                <select value={this.state.data.tech_version} name="tech_version" className="select2dom">
                                    {scmOption.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">URL</label>
                            <div className="col-sm-10">
                                <input type="text" name="url" className="form-control" placeholder="URL" value={this.state.data.url}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">用户名</label>
                            <div className="col-sm-10">
                                <input type="text" name="username" className="form-control" placeholder="用户名" value={this.state.data.userName}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">密码</label>
                            <div className="col-sm-10">
                                <input type="password" name="password" className="form-control" placeholder="名称" value={this.state.data.password}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <a onClick={::this.actionStep} data-step="2" className="btn btn-default">上一步</a>
                                <input type="submit" className="btn btn-primary ml10" value="下一步" />
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 4
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub4}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">网络</label>
                            <div className="col-sm-10">
                                <select value={this.state.data.net} name="net" className="select2dom">
                                    {this.state.net_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="col-md-4">
                                    <p>所属云：接入云</p>
                                    <p>网络名称：VPC-net</p>
                                </div>
                                <div className="col-md-4">
                                    <p>地域：杭州</p>
                                    <p>交换机：交换机1</p>
                                </div>
                                <div className="col-md-4">
                                    <p>网络类型：专有网络</p>
                                    <p>安全组：安全组1</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <a onClick={::this.actionStep} data-step="3" className="btn btn-default">上一步</a>
                                <input type="submit" className="btn btn-primary ml10" value="下一步"/>
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 5
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub5}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">操作系统：</label>
                            <div className="col-sm-4">
                                <select value={this.state.data.os} name="os" className="select2dom">
                                    {this.state.os_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                                <span className="ml20">系统版本：</span>
                                <select value={this.state.data.os_version} name="os_version" className="select2dom">
                                    {this.state.os_versions.map(function(option) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">CPU：</label>
                            <div className="col-sm-10">
                                <div className="btn-group" data-toggle="buttons">
                                    {this.state.cpu_options.map(function(option) {
                                        return <label className="btn btn-default" key={option.value}>
                                            <input type="radio" name="cpu" value={option.value} autoComplete="off" /> {option.label}
                                        </label>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">内存：</label>
                            <div className="col-sm-10">
                                <div className="btn-group" data-toggle="buttons">
                                    {this.state.memory_options.map(function(option) {
                                        return <label className="btn btn-default" key={option.value}>
                                            <input type="radio" name="memory" value={option.value} autoComplete="off" /> {option.label}
                                        </label>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">存储：</label>
                            <div className="col-sm-10">
                                <StoreConfig />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">计费方式：</label>
                            <div className="col-sm-10">
                                <BillingConfig />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">配置费用：</label>
                            <div className="col-sm-10">
                                <span style={{lineHeight: "34px"}}>￥{this.state.cost} 元</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <a onClick={::this.actionStep} data-step="4" className="btn btn-default">上一步</a>
                                <input type="submit" className="btn btn-primary ml10" value="下一步"/>
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 6
                    ? colClasse
                    : "fn-none"}>
                    <ProcessConfig />
                    <a onClick={::this.actionStep} data-step="5" className="btn btn-default">上一步</a>
                    <a onClick={::this.actionSub6} className="btn btn-primary ml10">下一步</a>
                </section>
                <section className={this.state.step == 7
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub7}>
                        <ElasticityConfig />
                        <div className="form-group">
                            <a onClick={::this.actionStep} data-step="6" className="btn btn-default">上一步</a>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 8
                    ? colClasse + " checking"
                    : "fn-none"}>
                    <h2>基础信息</h2>
                    <img src="images/wp.png" />
                    <div className="row">
                        <div className="col-md-2">
                            应用名称：
                        </div>
                        <div className="col-md-10">
                            {this.state.data.appName}xcvdf
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用版本：
                        </div>
                        <div className="col-md-10">
                            {this.state.data.version}1.2.3
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用类型：
                        </div>
                        <div className="col-md-10">
                            {this.state.data.category}java
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用描述：
                        </div>
                        <div className="col-md-10">
                            {this.state.data.describe}sdvfqwerqweer
                        </div>
                    </div>
                    <h2>配置信息</h2>
                    <div className="row">
                        <div className="col-md-2">
                            应用参数：
                        </div>
                        <div className="col-md-10">
                            Java版本：7.0
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="2"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            代码仓库：
                        </div>
                        <div className="col-md-10">
                            SVN https://git.oschina.net/zicjin/youyun-delivery-web.git
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="3"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            部署分区：
                        </div>
                        <div className="col-md-10">
                            阿里云 .NET
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="4"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            交付过程：
                        </div>
                        <div className="col-md-10">
                            构建-> 开发环境/测试环境部署
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="6"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            依赖服务：
                        </div>
                        <div className="col-md-10">
                            MySQL、Mongodb
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="7"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            实例配置：
                        </div>
                        <div className="col-md-10">
                            NET-10.5.1.6 4GHz*8G、100GB
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="5"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            弹性策略：
                        </div>
                        <div className="col-md-10">
                            最小节点2，最大节点10
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="8"></i>
                        </div>
                    </div>
                    <div className="mt20">
                        <a onClick={::this.actionSave} className="btn btn-default">保存</a>
                        <a onClick={::this.actionSubDone} className="btn btn-primary ml10">确认部署</a>
                    </div>
                </section>

                <section className={this.state.step == 9? "form-section total": "fn-none"}>
                    <Pies series={this.state.total} title={`${this.state.total[0].value}%`} radius="80" />
                    <ol id="totalStep">
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 1 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 1 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='1'>重试</a>">创建实例</a>
                                : "创建实例"
                            }
                        </li>
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 2 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 2 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='2'>重试</a>">启动实例</a>
                                : '启动实例'
                            }
                        </li>
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 3 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 3 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='2'>重试</a>">部署实例</a>
                                : '部署实例'
                            }
                        </li>
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 4 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 4 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='3'>重试</a>">启动应用</a>
                                : '启动应用'
                            }
                        </li>
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 5 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 5 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='4'>重试</a>">执行脚本</a>
                                : '执行脚本'
                            }
                        </li>
                        <li>
                            <i className={_.some(this.state.step_error, { 'step': 6 })? "fa fa-times-circle": "fa fa-check-circle"}></i>
                            { _.some(this.state.step_error, { 'step': 6 }) ?
                                <a data-toggle="popover" title="2016-1-13" data-placement="bottom"
                                    data-content="资源不足导致虚拟机创建失败<a class='retry' step='5'>重试</a>">完成</a>
                                : '完成'
                            }
                        </li>
                    </ol>
                </section>
            </div>
        )
    }
}

export default HistoryMixin(ServiceNew)

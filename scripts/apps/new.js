import request from "../request"
import Upload from "../modules/upload"
import HistoryMixin from '../history_mixin'
import ParametersTable from '../modules/parametersTable'
import StoreConfig from '../modules/storeConfig'
import ProcessConfig from './modules/processConfig'
import ServiceConfig from './modules/serviceConfig'
import ElasticityConfig from "../modules/elasticityConfig"
import BillingConfig from "../modules/billingConfig"
import Pies from "../charts/pies"
import {scmOption} from "../enums/scm"
import {cpusOption, memorysOption} from "../enums/instance_type"

class AppNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appid: "",
            appflag: "",
            cost: 0,
            form: {
                appConf: [],
                nodeConf: {
                    diskStorages:[]
                },
                scripts: [],
                appPackage: {},
                services: [],
                extendedStrategy: {}
            },
            step: 1,
            formStep: 1,
            os_family_options: [],
            os_version_options: [],
            cloud_options: [],
            net_options: [],
            network: {},
            cpu: 1,
            memory: 2,
            type_options: [],
            type_version_options: [],
            type_name: "Java",
            total: [{
                value: 70,
                legend: "完成量"
            }],
            step_error: [
                {
                    step: 1,
                    info: "资源不足"
                },{
                    step: 3,
                    info: "资源不足3"
                }
            ]
        }
    }
    setFromState(form) {
        Object.assign(this.state.form, form)
        this.forceUpdate()
    }
    componentDidMount() {
        this.root = $("#app_new")
        $("select.select2dom", this.root).select2()

        // init step1
        $.validator.unobtrusive.parse(document.querySelector('#form_step1'))
        this.initTypeForm()

        let step = this.props.location.query.step
        if (step)
            this.setState({step: parseInt(step), formStep: parseInt(step)})
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.step == this.state.step) return
        switch (nextState.step) {
            case 3:
                this.initResponsiveForm()
                break;
            case 4:
                this.initNetForm()
                break;
            case 5:
                this.initCloudForm()
                break;
            case 10:
                this.initPopover()
                break;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        switch (this.state.step) {
            case 1:
                this.renderTypeForm()
                break;
            case 4:
                this.renderNetForm()
            case 5:
                if (prevState.step != 5) // init after Dom render
                    $.validator.unobtrusive.parse(document.querySelector('#form_step5'))
                this.renderCloudForm()
                break;
        }
    }

    initTypeForm() {
        request("applications/type").done((data)=> {
            let type_options = data.map(function(item, i) {
                return {
                    label: item.name,
                    value: item.id
                }
            })
            this.setState({"type_options": type_options})
            this.initTypeVersionForm(type_options[0])
        })
    }
    renderTypeForm() {
        $("#apptype_sel").select3((e)=> {
            let item = _.find(this.state.type_options, {value: parseInt(e.params.data.id)})
            this.initTypeVersionForm(item)
        })
    }
    initTypeVersionForm(item) {
        this.setState({"type_name": item.label})
        request("applications/type_version?typeId=" + item.value).done((data)=>{
            let version_options = data.map(function(item, i){
                return {
                    label: item.version,
                    value: item.version // dirty
                }
            })
            this.setState({"type_version_options": version_options})
            $("#apptype_version_sel").select2()
        })
    }

    initResponsiveForm() {
        request("codes/only_flag").done((res)=> {
            this.setState({"appflag": res.id})
            new ZeroClipboard(document.getElementById("copy-button")).on("aftercopy", function(e) {
                alert("复制成功: " + e.data["text/plain"])
            })
        })
    }

    networks: [];
    initNetForm() {
        request("clouds/networkconf").done((data)=> {
            this.networks = data
            let options = data.map(function(item, i) {
                return {
                    label: item.name,
                    value: item.networkConfId
                }
            })
            this.setState({
                "net_options": options,
                "network": data[0] || {}
            })
        })
    }
    renderNetForm() {
        $("#network_sel").select3((e)=> {
            let item = _.find(this.networks, {networkConfId: parseInt(e.params.data.id)})
            this.setState({network: item})
        })
    }

    os_data: [];
    instanceTypes: [];
    initCloudForm() {
        request("clouds/image/1").done((data)=> {
            if (_.isEmpty(data)) return
            this.os_data = _.groupBy(data, 'osFamily') // dirty
            let options = _.map(this.os_data, function(item, name) {
                return {
                    label: name,
                    value: name
                }
            })
            this.setState({"os_family_options": options})
            this.buildCloudImageVersion(options[0].value)
        })
        if (this.state.network.cloudAccountId) {
            request(`clouds/instancetype/${this.state.network.cloudAccountId}`).done((data)=> {
                this.instanceTypes = data
            })
        }
    }
    buildCloudImageVersion(name) {
        let family = this.os_data[name]
        let options = family.map(function(item) {
            return {
                label: item.imageVer,
                value: item.imageId
            }
        })
        this.setState({"os_version_options": options})
    }
    renderCloudForm() {
        $("#os_family", this.root).select3((e)=> {
            this.buildCloudImageVersion(e.params.data.id)
        })
        $("#os_version", this.root).select2()
    }
    onInstanceTypeCpu(value, e) { // dirty
        this.setState({cpu: value})

        let instances = _.filter(this.instanceTypes, {vcpus: parseInt(value)})
        memorysOption.forEach(function(item) {
            item.disabled = !_.some(instances, {memory: parseInt(item.value)})
        })

        this.setStateInstanceType()
    }
    onInstanceTypeMemory(value, e) {
        this.setState({memory: value})

        let instances = _.filter(this.instanceTypes, {memory: parseInt(value)})
        cpusOption.forEach(function(item) {
            item.disabled = !_.some(instances, {vcpus: parseInt(item.value)})
        })

        this.setStateInstanceType()
    }
    setStateInstanceType() {
        let item = _.find(this.instanceTypes, {
            vcpus: parseInt(this.state.cpu),
            memory: parseInt(this.state.memory)
        })
        this.state.form.instanceTypeId = item? item.instanceTypeId: ""
    }

    initPopover() {
        let _this = this
        $('[data-toggle="popover"]', this.root).popover({html: true}).popover('show')
            .parent().delegate('a.retry', 'click', function() {
                _this.setState({step: parseInt($(this).attr("step"))})
            })
    }

    actionSub1(e) {
        e.preventDefault()
        $(e.target).validator_judge().done(()=> {
            let form = this.state.form
            Object.assign(form, _.serializeForm(e.target))

            let appType = _.find(this.state.type_options, {value: parseInt(form.appTypeId)})
            form.appTypeName = appType? appType.label: ""
            let appVersion = _.find(this.state.type_version_options, {value: parseInt(form.appVersionCode)})
            form.appVersionName = appVersion? appVersion.label: ""

            this.setState({form: form, formStep: 2, step: 2})
        })
    }
    actionSub2(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.currentTarget))
        this.setState({form: form, formStep: 3, step: 3})
    }
    actionSub3(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.currentTarget))

        form.appPackage.url = form.url // dirty
        form.appPackage.username = form.username
        form.appPackage.password = form.password
        form.appPackage.codeResourceName = form.codeResourceName
        form.appPackage.randomCode = form.randomCode

        this.setState({form: form, formStep: 4, step: 4})
    }
    actionSub4(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.target))
        form.nodeConf.networkConfId = form.networkConfId // dirty

        let networkConf = _.find(this.state.net_options, {value: parseInt(form.networkConfId)})
        form.networkConfName = networkConf? networkConf.label: ""

        this.setState({form: form, formStep: 5, step: 5})
    }
    actionSub5(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.target))
        form.nodeConf.imageId = form.imageId // dirty
        form.nodeConf.instanceTypeId = form.instanceTypeId
        form.nodeConf.costType = form.costType
        form.nodeConf.costMonth = form.costMonth
        form.nodeConf.diskStorages = form.diskStorages
        this.setState({form: form, formStep: 6, step: 6})
    }
    actionSub6(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.currentTarget))
        this.setState({form: form, formStep: 7, step: 7})
    }
    actionSub7(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.currentTarget))
        this.setState({form: form, formStep: 8, step: 8})
    }
    actionSub8(e) {
        e.preventDefault()
        let form = this.state.form
        Object.assign(form, _.serializeForm(e.currentTarget))
        if (form.isElasticity == "on") {
            form.extendedStrategy.minNodeNum = form.minNodeNum // dirty
            form.extendedStrategy.maxNodeNum = form.maxNodeNum
        }
        this.setState({form: form, formStep: 9, step: 9})
    }
    actionSubDone(e) {
        e.preventDefault()
        if (this.state.appid) { // dirty
            this.deploy()
            return
        }
        this.actionSave().done(()=> {
            this.deploy()
        })
    }
    deploy() {
        request("applications/deploy/" + this.state.appid, "POST").done(data => {
            // this.props.history.pushState(null, `/apps`)
            this.setState({formStep: 10, step: 10})
        })
    }
    actionSave() {
        return request("applications", "POST", this.state.form).done(res => {
            alert("保存成功！")
            this.setState({appid: res.msg})
        })
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
                            设置应用信息
                        </li>
                        <li onClick={::this.actionStep} data-step="2" className={this.state.step == 2? "active": ""}>
                            <i className={this.state.step < 2? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置应用参数
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
                            配置交付过程
                        </li>
                        <li onClick={::this.actionStep} data-step="7" className={this.state.step == 7? "active": ""}>
                            <i className={this.state.step < 7? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            添加依赖服务
                        </li>
                        <li onClick={::this.actionStep} data-step="8" className={this.state.step == 8? "active": ""}>
                            <i className={this.state.step < 8? "glyphicon glyphicon-stop": "fa fa-check-circle"}></i>
                            配置弹性策略
                        </li>
                    </ol>
                </div>
                <section className={this.state.step == 1
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub1} noValidate="novalidate" id="form_step1">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">名称</label>
                            <div className="col-sm-10">
                                <input type="text" name="applicationName" className="form-control" placeholder="名称" id="applicationName"
                                    data-val="true" data-val-required="名称是必填项."
                                    data-val-length-min="4" data-val-length="名称不能少于4个字符." />
                                <span className="field-validation-valid" data-valmsg-for="applicationName" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">LOGO</label>
                            <div className="col-sm-10">
                                <Upload setState={::this.setFromState} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">应用类型</label>
                            <div className="col-sm-10">
                                <select name="appTypeId" id="apptype_sel">
                                    {this.state.type_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">{this.state.type_name}版本</label>
                            <div className="col-sm-10">
                                <select name="appVersionCode" id="apptype_version_sel">
                                    {this.state.type_version_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">描述</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" name="description" rows="3"></textarea>
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
                        <ParametersTable step={this.state.step} param={`${this.state.form.appTypeId}/${this.state.form.appVersionCode}`} setState={::this.setFromState} />
                        <div className="form-group mt10">
                            <a onClick={::this.actionStep} data-step="1" className="btn btn-default">上一步</a>
                            <a onClick={::this.actionSub2} className="btn btn-primary ml10">下一步</a>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 3
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub3} noValidate="novalidate" id="form_step3">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">应用标识ID</label>
                            <div className="col-sm-10" style={{lineHeight: '32px'}}>
                                {this.state.appflag}
                                <a id="copy-button" data-clipboard-text={this.state.appflag} title="Click to copy me.">复制到剪贴板</a>
                                <input type="hidden" name="randomCode" value={this.state.appflag} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">仓库</label>
                            <div className="col-sm-10">
                                <select name="codeResourceName" className="select2dom">
                                    {scmOption.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">URL</label>
                            <div className="col-sm-10">
                                <input type="text" name="url" className="form-control" placeholder="URL" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">用户名</label>
                            <div className="col-sm-10">
                                <input type="text" name="username" className="form-control" placeholder="用户名"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">密码</label>
                            <div className="col-sm-10">
                                <input type="password" name="password" className="form-control" placeholder="名称"/>
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
                    <form className="form-horizontal" onSubmit={::this.actionSub4} noValidate="novalidate" id="form_step4">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">网络</label>
                            <div className="col-sm-10">
                                <select name="networkConfId" id="network_sel">
                                    {this.state.net_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="col-md-4">
                                    <p>所属云：{this.state.network.name}</p>
                                    <p>网络名称：{this.state.network.name}</p>
                                </div>
                                <div className="col-md-4">
                                    <p>地域：{this.state.network.regionId}</p>
                                    <p>交换机：{this.state.network.networkId}</p>
                                </div>
                                <div className="col-md-4">
                                    <p>网络类型：{this.state.network.type}</p>
                                    <p>安全组：{this.state.network.securityGroupId}</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <a onClick={::this.actionStep} data-step="3" className="btn btn-default">上一步</a>
                                <input type="submit" className="btn btn-primary ml10" value="下一步" />
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 5
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub5} noValidate="novalidate" id="form_step5">
                        <div className="form-group">
                            <label className="col-md-2 control-label">操作系统：</label>
                            <div className="col-md-4">
                                <select id="os_family">
                                    {this.state.os_family_options.map(function(option, i) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                                <select id="os_version" name="imageId" className="select2dom">
                                    {this.state.os_version_options.map(function(option) {
                                        return <option key={option.value} value={option.value}>{option.label}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">CPU：</label>
                            <div className="col-sm-10">
                                {/*<div className="btn-group" data-toggle="buttons">*/}
                                    <ReactRadioGroup className="react-radio-group" value={this.state.cpu} name="cpu" onChange={::this.onInstanceTypeCpu}>
                                    {cpusOption.map(function(option) {
                                        return <label className={option.disabled? "disabled btn btn-default": "btn btn-default"} key={option.value}>
                                            <input type="radio" name="cpu" value={option.value} autoComplete="off" disabled={option.disabled} /> {option.label}
                                        </label>
                                    })}
                                    </ReactRadioGroup>
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">内存：</label>
                            <div className="col-sm-10">
                                {/*<div className="btn-group" data-toggle="buttons">*/}
                                    <ReactRadioGroup className="react-radio-group" value={this.state.memory} name="memory" onChange={::this.onInstanceTypeMemory}>
                                    {memorysOption.map(function(option) {
                                        return <label className={option.disabled? "disabled btn btn-default": "btn btn-default"} key={option.value}>
                                            <input type="radio" name="memory" value={option.value} autoComplete="off" disabled={option.disabled} /> {option.label}
                                        </label>
                                    })}
                                    </ReactRadioGroup>
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">存储：</label>
                            <div className="col-sm-10">
                                <StoreConfig setState={::this.setFromState} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">计费方式：</label>
                            <div className="col-sm-10">
                                <BillingConfig setState={::this.setFromState} />
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
                                <input type="submit" className="btn btn-primary ml10" value="下一步" />
                            </div>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 6
                    ? colClasse
                    : "fn-none"}>
                    <ProcessConfig setState={::this.setFromState} />
                    <a onClick={::this.actionStep} data-step="5" className="btn btn-default">上一步</a>
                    <a onClick={::this.actionSub6} className="btn btn-primary ml10">下一步</a>
                </section>
                <section className={this.state.step == 7
                    ? colClasse
                    : "fn-none"}>
                    <ServiceConfig form={this.state.form} setState={::this.setFromState} />
                    <a onClick={::this.actionStep} data-step="6" className="btn btn-default">上一步</a>
                    <a onClick={::this.actionSub7} className="btn btn-primary ml10">下一步</a>
                </section>
                <section className={this.state.step == 8
                    ? colClasse
                    : "fn-none"}>
                    <form className="form-horizontal" onSubmit={::this.actionSub8}>
                        <ElasticityConfig />
                        <div className="form-group">
                            <a onClick={::this.actionStep} data-step="7" className="btn btn-default">上一步</a>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </form>
                </section>
                <section className={this.state.step == 9
                    ? colClasse + " checking"
                    : "fn-none"}>
                    <h2>基础信息</h2>
                    <img src="images/wp.png" />
                    <div className="row">
                        <div className="col-md-2">
                            应用名称：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.applicationName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用类型：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.appTypeName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用类型版本：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.appVersionName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            应用描述：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.description}
                        </div>
                    </div>
                    <h2>配置信息</h2>
                    <div className="row">
                        <div className="col-md-2">
                            应用参数：
                        </div>
                        <div className="col-md-10">
                            {_.map(this.state.form.appConf, (item, name)=> {
                                return <span key={name} className="mr10">{name}: {item}</span>
                            })}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="2"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            代码仓库：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.appPackage.codeResourceName} {this.state.form.appPackage.url}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="3"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            部署分区：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.networkConfName}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="4"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            交付过程：
                        </div>
                        <div className="col-md-10">
                            "应用安装 -> 应用启动 -> 应用包构建 -> 应用包部署 -> 应用包启动 -> 应用停止 -> 应用卸载"
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="6"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            依赖服务：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.services.map((item, index)=> {
                                return <span key={item.serviceId} className="mr10">{item.serviceName}</span>
                            })}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="7"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            实例配置：
                        </div>
                        <div className="col-md-10">
                            {this.state.form.nodeConf.diskStorages.map((item, index)=>{
                                return <span key={index} className="mr10">{item.size}GB</span>
                            })}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="5"></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2">
                            弹性策略：
                        </div>
                        <div className="col-md-10">
                            最小节点{this.state.form.extendedStrategy.minNodeNum}，最大节点{this.state.form.extendedStrategy.maxNodeNum}
                            <i className="glyphicon glyphicon-pencil" onClick={::this.actionStep} data-step="8"></i>
                        </div>
                    </div>
                    <div className="mt20">
                        <a onClick={::this.actionSave} className="btn btn-default">保存</a>
                        <a onClick={::this.actionSubDone} className="btn btn-primary ml10">确认部署</a>
                    </div>
                </section>

                <section className={this.state.step == 10? "form-section total": "fn-none"}>
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

export default HistoryMixin(AppNew)

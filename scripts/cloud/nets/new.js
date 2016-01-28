import request from "../../request"
import {typesOption as netTypesOption} from "../../enums/net_types"
import {areasOption} from "../../enums/areas"
import BandwidthConfig from "../modules/bandwidthConfig"
const Link = ReactRouter.Link

class CloudNetNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            net_type: 1,
            clouds: [{
                label: "接入云1",
                value: 1,
            },{
                label: "接入云2",
                value: 2,
            }],
            vpcnets: [{
                label: "VPC1",
                value: 1,
            },{
                label: "VPC2",
                value: 2,
            }],
            switchboards: [{
                label: "交换机1",
                value: 1,
            },{
                label: "交换机2",
                value: 2,
            }],
            security: [{
                label: "安全组1",
                value: 1,
            },{
                label: "安全组2",
                value: 2,
            }],
            netcardOption: [{
                label: "内网",
                value: 1,
            },{
                label: "外网",
                value: 2,
            }],
            netDirectionOption: [{
                label: "入方向",
                value: 1,
            },{
                label: "出方向",
                value: 2,
            }],
            netAuthOption: [{
                label: "允许",
                value: 1,
            },{
                label: "阻止",
                value: 2,
            }],
            netProtocolOption: [{
                label: "全部",
                value: 1,
            },{
                label: "部分",
                value: 2,
            }],
            netAuthTypeOption: [{
                label: "地址段访问",
                value: 1,
            },{
                label: "全网访问",
                value: 2,
            }],
        }
    }
    loadRegion() {
        request("clouds/region/" + this.state.form.cloudAccountId).done(res => {

        })
    }
    loadCloudAccount() {
        request("clouds/cloudaccount").done(data => {
            this.setState({
                clouds: data || []
            })
            this.loadRegion()
        })
    }
    componentDidMount () {
        this.root = $("#cloud_net_new")
        $("select.select2dom", this.root).select2()
    }
    newVpcnets(e) {

    }
    newSwitchboards(e) {

    }
    newSecurity(e) {

    }
    actionSub(e) {

    }
    onNetType(value, e) {
        this.setState({net_type: value})
    }
    render () {
        return(
            <div id="cloud_net_new">
                <h2>添加云网络
                    <Link className="fn-right" to={`/cloud/nets`}>返回云网络列表</Link>
                </h2>
                <form className="form-horizontal mt20" onSubmit={::this.actionSub}>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">网络名称：</label>
                        <div className="col-sm-9">
                            <input type="text" name="name" className="form-control" placeholder="自定义名称" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">所属云：</label>
                        <div className="col-sm-9">
                            <select name="cloud" className="select2dom">
                                {this.state.clouds.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">地域：</label>
                        <div className="col-sm-9">
                            <select name="cloud" className="select2dom">
                                {areasOption.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">网络类型：</label>
                        <div className="col-sm-9">
                            <ReactRadioGroup value={this.state.net_type} name="net_type" onChange={::this.onNetType}>
                                <label className="radio-inline">
                                    <input type="radio" name="net_type" value={1} /> 经典网络
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="net_type" value={2} /> 专有网络
                                </label>
                            </ReactRadioGroup>
                        </div>
                    </div>

                    <div className={this.state.net_type == 2? "form-group": "fn-none"}>
                        <label className="col-sm-3 control-label">专有网络：</label>
                        <div className="col-sm-9">
                            <select name="vpcnets" className="select2dom">
                                {this.state.vpcnets.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="btn btn-default btn-sm ml5" data-toggle="modal" data-target="#vpcnets_new">新建专有网络</a>
                        </div>
                    </div>
                    <div className={this.state.net_type == 2? "form-group": "fn-none"}>
                        <label className="col-sm-3 control-label">虚拟交换机：</label>
                        <div className="col-sm-9">
                            <select name="switchboards" className="select2dom ml10">
                                {this.state.switchboards.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="btn btn-default btn-sm ml5" data-toggle="modal" data-target="#switchboards_new">新建交换机</a>
                        </div>
                    </div>

                    <div className={this.state.net_type == 1? "": "fn-none"}>
                        <BandwidthConfig />
                    </div>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">安全组：</label>
                        <div className="col-sm-9">
                            <select name="security" className="select2dom">
                                {this.state.security.map(function(option, i) {
                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                })}
                            </select>
                            <a className="btn btn-default btn-sm ml5" data-toggle="modal" data-target="#security_new">新建安全组</a>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-9">
                            <Link to={`/cloud/nets`} className="btn btn-default">取消</Link>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </div>
                </form>

                <div id="vpcnets_new" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">创建专有网络</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.newVpcnets}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">网络名称</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="网络名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">网段</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="网段" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">描述</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" name="content" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">确定</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="switchboards_new" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">创建交换机</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.newSwitchboards}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">名称：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="名称" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">可用区：</label>
                                        <div className="col-sm-10">
                                            <select name="event" className="select2dom">
                                                {areasOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">网段：</label>
                                        <div className="col-sm-10">
                                            <input type="name" className="form-control" placeholder="网段" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">可用IP数：</label>
                                        <div className="col-sm-10 infos">
                                            33
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">描述：</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" name="content" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">确定</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="security_new" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title">添加安全组规则</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.newSecurity}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">网卡类型：</label>
                                        <div className="col-sm-9">
                                            <select name="event" className="select2dom">
                                                {this.state.netcardOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">规则方向：</label>
                                        <div className="col-sm-9">
                                            <select name="event" className="select2dom">
                                                {this.state.netDirectionOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">授权策略：</label>
                                        <div className="col-sm-9">
                                            <select name="event" className="select2dom">
                                                {this.state.netAuthOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">协议类型：</label>
                                        <div className="col-sm-9">
                                            <select name="event" className="select2dom">
                                                {this.state.netProtocolOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">端口范围：</label>
                                        <div className="col-sm-9">
                                            <input type="name" className="form-control" placeholder="端口范围" />
                                            <p>取值范围为1~65535，如"1/200、80/80</p>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">授权类型：</label>
                                        <div className="col-sm-9">
                                            <select name="event" className="select2dom">
                                                {this.state.netAuthTypeOption.map(function(option, i) {
                                                    return <option key={option.value} value={option.value}>{option.label}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">授权对象：</label>
                                        <div className="col-sm-9">
                                            <input type="auth_obj" className="form-control" placeholder="0.0.0.0/0" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">优先级：</label>
                                        <div className="col-sm-9">
                                            <input type="priority" className="form-control" placeholder="优先级" />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                    <button type="submit" className="btn btn-primary">确定</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default CloudNetNew

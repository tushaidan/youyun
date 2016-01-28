import request from "../../request"
const Link = ReactRouter.Link
import {areasOption} from "../../enums/areas"
import NodeIndex from "../modules/nodeIndex"

class CloudNetItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: "网络名称1",
                cloudAccountName: "接入云1",
                regionId: "杭州",
                proxyNodeStatus: "running",
                type: "专有网络",
                networkId: "192.168.0.0/16",
                bandwidth: "固定带宽：10M",
                description: "描述……",
                // createtime: "2015-06-09 15:33:54",
            },
            switch: {
                vSwitchName: "节点1",
                regionName: "杭州",
                zoneName: "可用区1",
                cidrBlock: "VPC-10.1.5.1/24",
                ipCount: "195",
                createTime: "2015-06-09 15:33:54",
                description: "描述……",
            },
            security: {
                securityGroupName: "安全组1",
                createTime: "2015-06-09 15:33:54",
                description: "描述……",
            },
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
    subSwitchboards(e) {
        alert("提交编辑")
    }
    subSecurity(e) {
        alert("提交编辑")
    }
    onDeleteSecurity(e) {
        alert("删除安全组")
    }
    onDeleteSwitchboards(e) {
        alert("删除交换机")
    }
    onDelete(e) {
        alert("删除云网络")
    }
    loadData() {
        request("clouds/networkconf/item/" + this.props.params.netId).done(res => {
            this.setState({data: res})
        })
    }
    loadSwitcherData() {
        request("clouds/vswitche/" + this.props.params.netId).done(res => {
            this.setState({switch: res})
        })
    }
    loadSecurityData() {
        request("clouds/securitygroup/" + this.props.params.netId).done(res => {
            this.setState({security: res})
        })
    }
    componentDidMount () {
        this.root = $("#cloud_net_item")
        this.loadData()
        this.loadSwitcherData()
    }
    render () {
        return(
            <div id="cloud_net_item">
                <h2>云网络：{this.state.name}
                    <Link className="fn-right" to={`/cloud/nets`}>返回云网络列表</Link>
                </h2>

                <p className="fn-tar">
                    <Link className="glyphicon glyphicon-edit" to={`/cloud/net/${this.props.params.netId}`}></Link>
                    <a className="glyphicon glyphicon-trash ml5" href="javascript:void(0)" onClick={::this.onDelete}></a>
                </p>
                <div className="row infos">
                    <div className="col-md-1">
                        名称：
                    </div>
                    <div className="col-md-2">
                        {this.state.name}
                    </div>
                    <div className="col-md-1">
                        所属云：
                    </div>
                    <div className="col-md-2">
                        {this.state.cloudAccountName}
                    </div>
                    <div className="col-md-1">
                        地域：
                    </div>
                    <div className="col-md-2">
                        {this.state.regionId}
                    </div>
                    <div className="col-md-1">
                        代理机：
                    </div>
                    <div className="col-md-2">
                        {this.state.proxyNodeStatus}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-1">
                        类型：
                    </div>
                    <div className="col-md-2">
                        {this.state.type}
                    </div>
                    <div className="col-md-1">
                        网段：
                    </div>
                    <div className="col-md-2">
                        {this.state.networkId}
                    </div>
                    <div className="col-md-1">
                        带宽：
                    </div>
                    <div className="col-md-2">
                        {this.state.bandwidth}
                    </div>
                    <div className="col-md-1">
                        创建时间：
                    </div>
                    <div className="col-md-2">
                        {this.state.createtime}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1">
                        描述：
                    </div>
                    <div className="col-md-11">
                        {this.state.description}
                    </div>
                </div>

                <ul id="net_tabs" className="nav nav-tabs mt20">
                    <li className="active">
                        <a href="javascript:void(0)" data-toggle="tab" data-target="#switch">交换机</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" data-toggle="tab" data-target="#security">安全组</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" data-toggle="tab" data-target="#instance">实例</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="switch">
                        <p className="fn-tar mt10">
                            <a className="glyphicon glyphicon-edit" href="javascript:void(0)" data-toggle="modal" data-target="#switchboards_edit"></a>
                            <a className="glyphicon glyphicon-trash ml5" href="javascript:void(0)" onClick={::this.onDeleteSwitchboards}></a>
                        </p>
                        <div className="row infos">
                            <div className="col-md-2">
                                名称：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.vSwitchName}
                            </div>
                            <div className="col-md-2">
                                地域：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.regionName}
                            </div>
                            <div className="col-md-2">
                                可用区：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.zoneName}
                            </div>
                        </div>
                        <div className="row infos">
                            <div className="col-md-2">
                                所属网络：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.cidrBlock}
                            </div>
                            <div className="col-md-2">
                                可用似网IP：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.ipCount}
                            </div>
                            <div className="col-md-2">
                                创建时间：
                            </div>
                            <div className="col-md-2">
                                {this.state.switch.createTime}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                描述：
                            </div>
                            <div className="col-md-10">
                                {this.state.switch.description}
                            </div>
                        </div>

                        <div id="switchboards_edit" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h4 className="modal-title">编辑交换机</h4>
                                    </div>
                                    <form className="form-horizontal" onSubmit={:: this.subSwitchboards}>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label className="col-sm-2 control-label">名称：</label>
                                                <div className="col-sm-10">
                                                    <input type="name" className="form-control" placeholder="名称"/>
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
                                                    <input type="name" className="form-control" placeholder="网段"/>
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
                    </div>
                    <div className="tab-pane" id="security">
                        <p className="fn-tar mt10">
                            <a className="glyphicon glyphicon-edit" href="javascript:void(0)" data-toggle="modal" data-target="#security_edit"></a>
                            <a className="glyphicon glyphicon-trash ml5" href="javascript:void(0)" onClick={::this.onDeleteSecurity}></a>
                        </p>
                        <div className="row infos">
                            <div className="col-md-3">
                                安全组名称：
                            </div>
                            <div className="col-md-3">
                                {this.state.security.securityGroupName}
                            </div>
                            <div className="col-md-3">
                                创建时间：
                            </div>
                            <div className="col-md-3">
                                {this.state.security.createTime}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                描述：
                            </div>
                            <div className="col-md-10">
                                {this.state.security.description}
                            </div>
                        </div>
                        <h5 style={{marginTop: 30}}>规则配置：</h5>
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                    <th>授权策略</th>
                                    <th>协议类型</th>
                                    <th>端口范围</th>
                                    <th>授权类型</th>
                                    <th>授权对象</th>
                                    <th>优先级</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>允许</th>
                                    <td>全部</td>
                                    <td>1/1</td>
                                    <td>地质段访问</td>
                                    <td>0.0.0.0/1</td>
                                    <td>110</td>
                                </tr>
                                <tr>
                                    <th>允许</th>
                                    <td>全部</td>
                                    <td>1/1</td>
                                    <td>地质段访问</td>
                                    <td>0.0.0.0/1</td>
                                    <td>110</td>
                                </tr>
                            </tbody>
                        </table>

                        <div id="security_edit" className="modal fade" role="dialog">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 className="modal-title">编辑安全组规则</h4>
                                    </div>
                                    <form className="form-horizontal" onSubmit={::this.subSecurity}>
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
                    <div className="tab-pane" id="instance">
                        <NodeIndex />
                    </div>
                </div>
            </div>
        )
    }
}

export default CloudNetItem

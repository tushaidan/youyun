const Link = ReactRouter.Link
import request from "../../request"
import {access} from "../../enums/cloud_access"
import PiesSolid from "../../charts/pies_solid"

class CloudAccess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ids: [],
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request("clouds/cloudaccount").done(data => {
            data.forEach(function(item) { // dirty
                item.cpu = {}
                item.mem = {}
                item.disk = {}
            })
            this.setState({
                data: data || [],
                ids: _.keyBy(data, 'cloudAccountId') // dirty
            })
            this.loadNodes()
            this.loadPubips()
            this.loadNetworks()
            this.loadMonitorCpu()
            this.loadMonitorMemory()
            this.loadMonitorDisk()
        })
        // [{ "cloudAccountId": "云账户ID", "name": "名称", "provider":"云供应商", "status":"状态" }]
    }
    loadNodes() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("clouds/node_status/" + id).done(res => {
                Object.assign(item, res)  // dirty
                this.forceUpdate()
            })
        })
    }
    loadPubips() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("clouds/pub_ip/count/" + id).done(res => {
                Object.assign(item, res)  // dirty
                this.forceUpdate()
            })
        })
    }
    loadNetworks() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("clouds/network/count/" + id).done(res => {
                Object.assign(item, res)  // dirty
                this.forceUpdate()
            })
        })
    }
    loadMonitorCpu() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("monitors/cpu/runtime", "POST", {id: id, idType: 5}).done(res => {
                item.cpu = res // dirty
                this.forceUpdate()
            })
        })
    }
    loadMonitorMemory() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("monitors/mem/runtime", "POST", {id: id, idType: 5}).done(res => {
                item.mem = res // dirty
                this.forceUpdate()
            })
        })
    }
    loadMonitorDisk() {
        _.map(this.state.ids, (obj, id)=> {
            let item = _.find(this.state.data, {cloudAccountId: parseInt(id)})
            request("monitors/disk/runtime", "POST", {id: id, idType: 5}).done(res => {
                item.disk = res // dirty
                this.forceUpdate()
            })
        })
    }
    onDelete(event) {
        event.preventDefault()
        if (!confirm("确定删除？"))
            return
        let accountId = event.currentTarget.dataset.id
        request("clouds/cloudaccount/" + accountId, "DELETE").done(res => {
            alert("删除成功")
        })
    }
    filterSeries(data) {
        return [{
            value: data,
            legend: "使用率"
        }]
    }
    render() {
        return (
            <div id="cloud_accesses">
                {this.state.data.map((item, index) => {
                    return (
                        <div className="account" key={item.cloudAccountId}>
                            <div className={`provider ${item.provider}`}>
                                {access[item.provider]}
                            </div>
                            <span className="action">
                                <Link to={`cloud/access/${item.cloudAccountId}/edit`}>
                                    <i className="fa fa-pencil-square-o"></i>
                                    编辑
                                </Link>
                                <a className="ml5" onClick={::this.onDelete} data-id={item.cloudAccountId} href="javascript:;">
                                    <i className="fa fa-trash"></i>
                                    删除
                                </a>
                            </span>

                            <div className="row">
                                <div className="col-md-3 infos">
                                    <p>实例
                                        <span className="status_pandect ml10">
                                            <span className="green"><i>●</i>{item.runningNum}</span>
                                            <span className="orange ml5"><i>●</i>{item.suspendNum}</span>
                                            <span className="red ml5"><i>●</i>{item.stopNum}</span>
                                        </span>
                                    </p>
                                    <p>公网IP:<span className="ml10">{item.elasticPubIpNum}</span></p>
                                    <p>经典网络IP:<span className="ml10">{item.classicPubIpNum}</span></p>
                                    <p>专有网络:<span className="ml10">{item.privateNetWorkNum}</span></p>
                                    <p>余额:<span className="ml10">{0}</span></p>
                                </div>
                                <div className="col-md-3 piebox">
                                    <PiesSolid series={this.filterSeries(item.cpu.ratio)} title={item.cpu.ratio+"%"} subtext="CPU" radius="60" />
                                    <p className="monitor_title">{item.cpu.useValueSum}GHz</p>
                                    <p>{item.cpu.maxValueSum}GHz</p>
                                </div>
                                <div className="col-md-3 piebox">
                                    <PiesSolid series={this.filterSeries(item.mem.ratio)} title={item.mem.ratio+"%"} subtext="内存" radius="60" />
                                    <p className="monitor_title">{item.mem.useValueSum}GHz</p>
                                    <p>{item.mem.maxValueSum}GHz</p>
                                </div>
                                <div className="col-md-3 piebox">
                                    <PiesSolid series={this.filterSeries(item.disk.ratio)} title={item.disk.ratio+"%"} subtext="存储" radius="60" />
                                    <p className="monitor_title">{item.disk.useValueSum}G</p>
                                    <p>{item.disk.maxValueSum}G</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <Link to="cloud/access/new" className="account-add">
                    <i className="glyphicon glyphicon-plus"></i>
                </Link>
            </div>
        )
    }
}

export default CloudAccess

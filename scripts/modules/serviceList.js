import request from "../request"
import status from "../enums/app_status"
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class ServiceList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request("services").done(res => {
            if (_.isEmpty(res)) return
            this.setState({data: res.datas})
        })
    }
    onDelete(e) {
        e.preventDefault()
        confirm("确定删除？").done(function(){
            let serviceId = e.currentTarget.dataset.serviceid
            request("services/" + serviceId, "DELETE").done(data => {
                this.setState({data: data})
            })
        })
    }
    filter(item) {
        item.runTimeStr = moment.duration(item.runTime*1000).humanize()
        item.runStatusObj = status[item.runStatus]
        item.startTimeStr = moment(item.startTime).format('YYYY-MM-DD hh:mm')
        return item
    }
    render() {
        return (
            <div className="row thumbnails appindex">
                {this.state.data.map(this.filter).map((service, index) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={service.serviceId} style={{zIndex: 100-index}}>
                            <Link className={`thumbnail`} to={`service/${service.serviceId}`}>
                                <div className="caption row">
                                    <div className="col-md-5">
                                        <img src="images/wp.png" />
                                    </div>
                                    <div className="col-md-7">
                                        <h4>{service.serviceName}</h4>
                                        <p>运行时长：{service.runTimeStr}</p>
                                        <p>启动时间：{service.runStatusStr}</p>
                                        <p>服务类型：{service.type}</p>
                                        <p>服务节点：{service.nodeNum}个</p>
                                    </div>
                                </div>
                                <div className="infoline">
                                    <span className="info">
                                        <i className="glyphicon glyphicon-hdd"></i>{service.cpu}%</span>
                                    <span className="info">
                                        <i className="glyphicon glyphicon-dashboard"></i>{service.memory}%</span>
                                    <span className="info">
                                        <i className="glyphicon glyphicon-fire"></i>{service.database}%</span>
                                </div>
                                <span className={`status ${service.runStatusObj.color}`}>
                                    {service.runStatusObj.text}
                                </span>
                                <div className="dropdown actions">
                                    <span className="btn btn-link" data-toggle="dropdown">
                                        <span className="fa fa-cog"></span>
                                    </span>
                                    <ul className="dropdown-menu">
                                        <li><span>控制台</span></li>
                                        <li><span>详情</span></li>
                                        <li><span>编辑</span></li>
                                        <li><span>卸载</span></li>
                                        <li><span>启动</span></li>
                                        <li><span>停止</span></li>
                                        <li><span onClick={::this.onDelete} data-serviceid={service.serviceId}>删除</span></li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    )
                })}
                <div className="col-lg-4 col-md-6">
                    <a href="#/service/new" className="thumbnail project-add">
                        <i className="glyphicon glyphicon-plus"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default HistoryMixin(ServiceList)

import request from "../request"
import status from "../enums/app_status"
const Link = ReactRouter.Link

class AppList extends React.Component {
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
        request("applications").done(res => {
            if (_.isEmpty(res)) return
            this.setState({data: res.datas})
        })
    }
    onDelete(event) {
        event.preventDefault()
        if (!confirm("确定删除？"))
            return
        let appId = event.currentTarget.dataset.appid
        request("applications/" + appId, "DELETE").done(data => {
            this.setState({data: data})
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
                {this.state.data.map(this.filter).map((app, index) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={app.applicationId} style={{zIndex: 100-index}}>
                            <Link className={`thumbnail`} to={`app/${app.applicationId}`}>
                                <div className="caption row">
                                    <div className="col-md-5">
                                        <img src="images/mysql-logo.svg" />
                                    </div>
                                    <div className="col-md-7">
                                        <h4>{app.applicationName}</h4>
                                        <p>运行时长：{app.runTimeStr}</p>
                                        <p>启动时间：{app.runStatusStr}</p>
                                        <p>服务类型：{app.type}</p>
                                        <p>服务节点：{app.nodeNum}个</p>
                                    </div>
                                </div>
                                <div className="infoline">
                                    <span className="info">
                                        <i className="glyphicon glyphicon-hdd"></i>{app.cpu}%</span>
                                    <span className="info">
                                        <i className="glyphicon glyphicon-dashboard"></i>{app.memory}%</span>
                                    <span className="info">
                                        <i className="glyphicon glyphicon-fire"></i>{app.database}%</span>
                                </div>
                                <span className={`status ${app.runStatusObj.color}`}>
                                    {app.runStatusObj.text}
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
                                        <li><span onClick={::this.onDelete} data-appid={app.appId}>删除</span></li>
                                    </ul>
                                </div>
                            </Link>
                        </div>
                    )
                })}
                <div className="col-lg-4 col-md-6">
                    <a href="#/app/new" className="thumbnail project-add">
                        <i className="glyphicon glyphicon-plus"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export default AppList

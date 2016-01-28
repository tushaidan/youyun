const Link = ReactRouter.Link
import request from "../../request"
import HistoryMixin from '../../history_mixin'

class Sidebar extends React.Component {
    static contextTypes = { // https://github.com/rackt/react-router/blob/master/CHANGES.md#state-mixin
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            apps: []
        }
    }
    loadApps() {
        request("applications").done(data => {
            this.setState({apps: data || []})
        })
    }
    componentDidMount() {
        this.loadApps()
    }
    componentDidUpdate() {
        $("#select2apps").select2().off().on("select2:select", (event)=> {
            let serviceId = event.params.data.id
            this.props.history.pushState(null, `/service/${serviceId}`)
        })
    }
    render() {
        return (
            <div id="sidebar">
                <select value={this.props.serviceId} id="select2apps" readOnly="true">
                    {this.state.apps.map((app, index) => {
                        return <option key={app.applicationId} value={app.applicationId}>{app.applicationName}</option>
                    })}
                </select>
                <ul id="sidenav">
                    <li className={this.context.location.pathname.endsWith("pandect")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/pandect`}><i className="glyphicon glyphicon-signal mr5"></i>服务总览</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("monitor")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/monitor`}><i className="glyphicon glyphicon-eye-open mr5"></i>运行监控</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/service/${this.props.serviceId}/node`)? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/nodes`}><i className="glyphicon glyphicon-equalizer mr5"></i>节点管理</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("partition")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/partition`}><i className="glyphicon glyphicon-object-align-bottom mr5"></i>分区管理</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("setting")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/setting`}><i className="fa fa-cog mr5"></i>服务配置</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("elasticity")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/elasticity`}><i className="fa fa-signal mr5"></i>弹性策略</Link>
                    </li>
                    <li className={this.context.location.pathname.endsWith("dependent")? "active": ""}>
                        <Link to={`/service/${this.props.serviceId}/dependent`}><i className="fa fa-sitemap mr5"></i>依赖服务</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/service/${this.props.serviceId}/schedule`)}>
                        <Link to={`/service/${this.props.serviceId}/schedules`}><i className="fa fa-share-alt-square mr5"></i>作业调度</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default HistoryMixin(Sidebar)

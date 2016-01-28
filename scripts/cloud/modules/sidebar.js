const Link = ReactRouter.Link

class Sidebar extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    render() {
        return (
            <div id="sidebar" className="pt10">
                <ul id="sidenav">
                    <li className={this.context.location.pathname.startsWith("/cloud/access")? "active": ""}>
                        <Link to={`/cloud/access`}><i className="glyphicon glyphicon-signal mr5"></i>云接入</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/cloud/node`)? "active": ""}>
                        <Link to={`/cloud/nodes`}><i className="glyphicon glyphicon-equalizer mr5"></i>云节点</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith("/cloud/net")? "active": ""}>
                        <Link to={`/cloud/nets`}><i className="glyphicon glyphicon-equalizer mr5"></i>云网络</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith("/cloud/ip")? "active": ""}>
                        <Link to={`/cloud/ips`}><i className="glyphicon glyphicon-equalizer mr5"></i>公网IP</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith("/cloud/script")? "active": ""}>
                        <Link to={`/cloud/scripts`}><i className="glyphicon glyphicon-object-align-bottom mr5"></i>脚本库</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar

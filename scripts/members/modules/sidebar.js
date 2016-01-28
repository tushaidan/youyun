const Link = ReactRouter.Link

class Sidebar extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    render() {
        return (
            <div id="sidebar" className="pt10">
                <ul id="sidenav">
                    <li className={this.context.location.pathname.startsWith("/members/departments")? "active": ""}>
                        <Link to={`/members/departments`}><i className="glyphicon glyphicon-signal mr5"></i>部门管理</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith(`/members/users`)? "active": ""}>
                        <Link to={`/members/users`}><i className="glyphicon glyphicon-equalizer mr5"></i>用户管理</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith("/members/roles")? "active": ""}>
                        <Link to={`/members/roles`}><i className="glyphicon glyphicon-equalizer mr5"></i>角色管理</Link>
                    </li>
                    <li className={this.context.location.pathname.startsWith("/members/auths")? "active": ""}>
                        <Link to={`/members/auths`}><i className="glyphicon glyphicon-equalizer mr5"></i>权限管理</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar

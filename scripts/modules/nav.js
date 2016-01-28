const Link = ReactRouter.Link

const Nav = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState() {
        return {
            username: "guest"
        }
    },
    logout() {
        localStorage.removeItem('yydvy_token')
        this.history.pushState(null, "/login")
    },
    componentWillUpdate() {
        this.setUsername()
    },
    componentWillMount() {
        this.setUsername()
    },
    setUsername() {
        if (localStorage["yydvy_username"])
            this.setState({username: localStorage["yydvy_username"]})
    },
    render() {
        return (
            <nav id="nav" className="navbar navbar-inverse navbar-static-top navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">导航</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/#/"></a>
                    </div>

                    <div className="collapse navbar-collapse" id="navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/pandect">
                                    <i className="fa fa-globe mr5"></i>总览</Link>
                            </li>
                            <li>
                                <Link to="/apps">
                                    <i className="fa fa-cubes mr5"></i>应用</Link>
                            </li>
                            <li>
                                <Link to="/services">
                                    <i className="fa fa-server mr5"></i>服务</Link>
                            </li>
                            <li>
                                <Link to="/cloud">
                                    <i className="fa fa-tachometer mr5"></i>环境</Link>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    <i className="glyphicon glyphicon-user mr5"></i>
                                    {this.state.username}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a href="#/setting">个人设置</a>
                                    </li>
                                    <li>
                                        <a href="#/members">成员管理</a>
                                    </li>
                                    <li role="separator" className="divider"></li>
                                    <li>
                                        <a onClick={this.logout}>退出</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
})

export default Nav

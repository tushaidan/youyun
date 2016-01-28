import Nav from "./modules/nav"
// import Compatibility from "./modules/compatibility"

const Main = React.createClass({
    mixins: [ReactRouter.History],
    contextTypes: {
        location: React.PropTypes.object
    },
    verify() {
        if (this.history.isActive("login") || this.history.isActive("register"))
            return
        if (!localStorage['yydvy_token'])
            this.history.pushState(null, "/login")
    },
    componentWillUpdate() {
        this.verify()
    },
    componentWillMount() {
        this.verify()
    },
    verifyRoute() {
        if (this.context.location.pathname == "/")
            this.props.history.pushState(null, "/pandect")
    },
    componentDidUpdate() {
        this.verifyRoute()
    },
    componentDidMount() {
        this.verifyRoute()
    },
    render() {
        return (
            <div id="main">
                <Nav />
                <div id="content" className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        )
    }
})

export default Main

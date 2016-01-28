import request from "../../request"
import Graph from "../../charts/graph"

class ServiceConfig extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            series: {
                nodes: [
                    {
                        id: 0,
                        name: 'application',
                        symbol: 'image://images/wp.png',
                        x: 20,
                        y: 0
                    }, {
                        id: 1,
                        name: 'mysql',
                        symbol: 'image://images/mysql-logo.svg',
                        x: 0,
                        y: 20
                    }, {
                        id: 2,
                        name: 'mongodb',
                        symbol: 'image://images/MongoDB.jpg',
                        x: 20,
                        y: 20
                    }, {
                        id: 3,
                        name: 'redis',
                        symbol: 'image://images/redis.png',
                        x: 40,
                        y: 20
                    }
                ],
                edges: [
                    {
                        source: 0,
                        target: 1
                    }, {
                        source: 0,
                        target: 2
                    }, {
                        source: 0,
                        target: 3
                    }
                ]
            }
        }
    }
    actionSub() {

    }
    onSelect(name) {
        this.setState({form: name})
    }
    componentWillUpdate(nextProps, nextState) {
        this.state.series.nodes[0].name = this.props.form.applicationName || "application"
        if (this.props.form.logoUrl)
            this.state.series.nodes[0].symbol = "image://" + this.props.form.logoUrl
    }
    loadData() {
        this.state.series.nodes = [
            {
                id: 0,
                name: "application",
                x: 20,
                y: 0
            }
        ]
        this.forceUpdate()
        // request("services/type").done((res) => {
        //     res.forEach((item, i) => {
        //         this.state.series.nodes.push({id: item.id, name: item.name, symbol: item.logoUrl, y: 20, x: i*20})
        //     })
        //     this.state.series.edges = res.map((item, i) => {
        //         return {source: 0, target: item.id}
        //     })
        //     this.forceUpdate()
        // })

        request("services").done((res) => {
            if (_.isEmpty(res)) return
            this.setState({services: res.datas})
        })
    }
    componentDidMount() {
        // this.loadData()
    }
    addServicesSub(e) {
         let data = _.serializeForm(e.currentTarget)
         let item = _.find(this.state.services, {serviceId: data.service})
         let size = this.state.series.nodes.length-1
         this.state.series.nodes.push({id: item.serviceId, name: item.name, symbol: item.logoUrl, y: 20, x: size*20})
         this.forceUpdate()
    }
    render() {
        return (
            <div id="service_config" className="row">

                <div className="col-md-6">
                    <p className="fn-tar">
                        <a className="btn btn-primary" data-toggle="modal" data-target="#addServices">添加服务</a>
                    </p>
                    <Graph series={this.state.series} onSelect={:: this.onSelect} width="459" height="459"/>
                </div>
                <div className="col-md-6">
                    <section className={this.state.form == "mysql"
                        ? ""
                        : "fn-none"}>
                        <form className="form-horizontal" onSubmit={:: this.actionSub}>
                            <legend>MySQL服务配置</legend>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">数据源名称</label>
                                <div className="col-sm-10">
                                    <input type="text" name="db_name" className="form-control" placeholder="名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">用户名</label>
                                <div className="col-sm-10">
                                    <input type="text" name="db_username" className="form-control" placeholder="名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">密码</label>
                                <div className="col-sm-10">
                                    <input type="text" name="db_password" className="form-control" placeholder="名称"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">Schema脚本</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" name="db_schema" rows="3"></textarea>
                                </div>
                            </div>
                        </form>
                    </section>

                    <section className={this.state.form == "mongodb"
                        ? ""
                        : "fn-none"}>
                        MongoDB Form
                    </section>

                    <section className={this.state.form == "redis"
                        ? ""
                        : "fn-none"}>
                        Redis Form
                    </section>
                </div>

                <div id="addServices" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">添加服务</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={::this.addServicesSub}>
                                <div className="modal-body">
                                    {this.state.services.map((service, i) => {
                                        return <div class="radio">
                                            <label>
                                                <input type="radio" name="service" value={service.serviceId} /> {service.name}
                                            </label>
                                        </div>
                                    })}
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

export default ServiceConfig

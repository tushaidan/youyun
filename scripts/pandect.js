import request from "./request"
import AppList from "./modules/appList"
import ServiceList from "./modules/serviceList"
import Pies from "./charts/pies"

class Pandect extends React.Component {
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
        // request("pandect").done(data => {
        //     this.setState({data: data || {}})
        // })
    }
    render() {
        return (
            <div>
                <h2>运行信息</h2>
                <div id="runtime_info" className="row">
                    <div className="col-md-4">
                        <div className="info_box1">
                            <p className="title">节点</p>
                            <span className="value">{this.state.data.node_num}</span>
                            <div className="infos">
                                <span className="color1">在线：{this.state.data.node_online}</span>
                                <span className="color2">挂起：{this.state.data.node_suspend}</span>
                                <span className="color3">停止：{this.state.data.node_stop}</span>
                            </div>
                        </div>
                        <div className="info_box1">
                            <p className="title">IP</p>
                            <span className="value">{this.state.data.ip_num}</span>
                            <div className="infos">
                                <span className="color1">公网IP：{this.state.data.ip_pub}</span>
                                <span className="color2">内网IP：{this.state.data.ip_private}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="info_box1 row">
                            <div className="col-md-4">
                                <h4>CPU</h4>
                                <p>12.4GHz / 230GHz</p>
                                <p>已分配CPU明细：<br />
                                    2*3*4GHz<br />
                                    5*4*4GHz
                                </p>
                            </div>
                            <div className="col-md-4">
                                <h4>内存</h4>
                                <p>12.4GHz / 230GHz</p>
                                <p>已分配内存明细：<br />
                                    5*8GHz<br />
                                    10*4GHz
                                </p>
                            </div>
                            <div className="col-md-4">
                                <h4>存储</h4>
                                <p>53.8G / 2T</p>
                                <p>已分配存储明细：<br />
                                    5*8GHz<br />
                                    10*4GHz
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>应用</h2>
                <AppList />
                <h2>服务</h2>

            </div>
        )
    }
}

export default Pandect

class AppPartition extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: "默认分区",
                cloud: "云账户1",
                location: "杭州",
                location_available: "杭州可用区A",
                network: "生产环境网络(经典网络,固定带宽:10MB..."
            }
        }
    }
    render() {
        return (
            <div id="partition">
                <h2>分区管理</h2>
                <div className="row infos">
                    <div className="col-md-3">
                        分区名称：{this.state.data.name}
                    </div>
                    <div className="col-md-3">
                        所属云：{this.state.data.cloud}
                    </div>
                    <div className="col-md-3">
                        地域：{this.state.data.location}
                    </div>
                    <div className="col-md-3">
                        可用区：{this.state.data.location_available}
                    </div>
                </div>
                <div className="row infos">
                    <div className="col-md-12">
                        分区网络：{this.state.data.network}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppPartition

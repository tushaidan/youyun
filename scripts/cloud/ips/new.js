import request from "../../request"
import BandwidthConfig from "../modules/bandwidthConfig"
import {areasOption} from "../../enums/areas"
const Link = ReactRouter.Link

class CloudIpNew extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            area: 1,
            data: {

            }
        }
    }
    componentDidMount() {
        this.root = $("#nodes")
    }
    submit(e) {

    }
    onChangeArea(value, e) {
        this.setState({area: value})
    }
    render() {
        return (
            <div id="nodes">
                <h2>申请公网IP
                    <Link className="fn-right" to={`/cloud/ips`}>返回公网IP列表</Link>
                </h2>
                <form className="form-horizontal mt20" onSubmit={::this.submit}>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">地域：</label>
                        <div className="col-sm-9">
                            <ReactRadioGroup name="area" value={this.state.area} onChange={::this.onChangeArea}>
                                {areasOption.map(function(option, i) {
                                    return <label className="radio-inline" key={option.value}>
                                        <input type="radio" name="area" value={option.value} /> {option.label}
                                    </label>
                                })}
                            </ReactRadioGroup>
                        </div>
                    </div>
                    <BandwidthConfig />
                    <div className="form-group">
                        <label className="col-sm-3 control-label">购买数量：</label>
                        <div className="col-sm-9">
                            <input type="number" name="name" className="form-control" placeholder="" /> 个
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">配置费用：</label>
                        <div className="col-sm-9 infos">
                            ￥ <span className="price">0.020</span> /时
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">公网流量费用：</label>
                        <div className="col-sm-9 infos">
                            ￥ <span className="price">0.800</span> /GB
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-10">
                            <Link to={`/cloud/ips`} className="btn btn-default">取消</Link>
                            <input type="submit" className="btn btn-primary ml10" value="提交"/>
                        </div>
                    </div>
                </form>

            </div>
        )
    }
}

export default CloudIpNew

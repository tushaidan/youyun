import HistoryMixin from '../../history_mixin'
import request from "../../request"
import {accessOption} from "../../enums/cloud_access"
const Link = ReactRouter.Link

class CloudAccessNew extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            provider: "aliyun"
        }
    }
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#cloud_access_form'))
    }
    submit(e) {
        e.preventDefault()
        $(e.target).validator_judge().done(()=> {
            request("clouds/cloudaccount", "POST", _.serializeForm(e.target)).done(res => {
                if (res.status == "fail") return
                this.props.history.pushState(null, `/cloud/access`)
            })
        })
    }
    render() {
        let data = this.state.data
        return (
            <div id="cloud_access_new" className="mt20">
                <p className="fn-tar">
                    <Link to="/cloud/access" >返回云列表</Link>
                </p>
                <form id="cloud_access_form" className="form-horizontal" onSubmit={::this.submit}>
                    <div className="form-group">
                        <label htmlFor="provider" className="col-sm-2 control-label">云类型</label>
                        <div className="col-sm-10">
                            {accessOption.map((option) => {
                                return (
                                    <div className="radio" key={option.value}>
                                        <label>
                                            <input type="radio" name="provider" value={option.value}
                                                checked={this.state.provider == option.value}
                                                onChange={()=> this.setState({provider: option.value})} />
                                            {option.label}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="api_key" className="col-sm-2 control-label">名称</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" className="form-control" placeholder="" data-val="true" data-val-required="名称是必填项." />
                            <span className="field-validation-valid" data-valmsg-for="name" data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="api_key" className="col-sm-2 control-label">API KEY</label>
                        <div className="col-sm-10">
                            <input type="text" name="accessKeyId" className="form-control" placeholder="API KEY" data-val="true" data-val-required="API KEY是必填项." />
                            <span className="field-validation-valid" data-valmsg-for="accessKeyId" data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">密钥</label>
                        <div className="col-sm-10">
                            <input type="password" name="accessKeySecret" className="form-control" data-val="true" data-val-required="密钥是必填项." />
                            <span className="field-validation-valid" data-valmsg-for="accessKeySecret" data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">确定</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default HistoryMixin(CloudAccessNew)

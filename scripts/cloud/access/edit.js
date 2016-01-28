import HistoryMixin from '../../history_mixin'
import request from "../../request"
import {accessOption} from "../../enums/cloud_access"
const Link = ReactRouter.Link

class CloudAccessEdit extends React.Component {
    static contextTypes = {
        location: React.PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#cloud_access_form'))
    }
    componentDidMount() {
        this.loadData()
    }
    loadData() {
        request(`clouds/cloudaccount/${this.props.params.accessId}`).done(res => {
            this.setState({form: res || {}})
        })
    }
    submit(e) {
        e.preventDefault()
        $(e.target).validator_judge().done(()=> {
            request("clouds/cloudaccount", "PUT", _.serializeForm(e.target)).done(res => {
                if (res.status == "fail") return
                this.props.history.pushState(null, `/cloud/access`)
            })
        })
    }
    render() {
        let form = this.state.form
        return (
            <div id="cloud_account_edit" className="mt20">
                <p className="fn-tar">
                    <Link to="/cloud/access">返回云列表</Link>
                </p>
                <form id="cloud_account_form" className="form-horizontal" onSubmit={::this.submit}>
                    <input type="hidden" name="cloudAccountId" value={this.state.form.cloudAccountId} />
                    <div className="form-group">
                        <label htmlFor="provider" className="col-sm-2 control-label">云类型</label>
                        <div className="col-sm-10">
                            {accessOption.map((option) => {
                                return (
                                    <div className="radio" key={option.value}>
                                        <label>
                                            <input type="radio" name="provider" value={option.value}
                                                checked={this.state.form.provider == option.value}
                                                onChange={() => this.setState({form: Object.assign(this.state.form, {provider: option.value})})} />
                                            {option.label}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="api_key" className="col-sm-2 control-label">API KEY</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="api_key" placeholder="API KEY" value={this.state.form.accessKeyId}
                                data-val="true" data-val-required="API KEY是必填项." />
                            <span className="field-validation-valid" data-valmsg-for="accessKeyId" data-valmsg-replace="true"></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-2 control-label">密钥</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" placeholder="Password" value={this.state.form.accessKeySecret}
                                data-val="true" data-val-required="密钥是必填项." />
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

export default HistoryMixin(CloudAccessEdit)

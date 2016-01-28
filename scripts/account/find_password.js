import request from '../request'
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class FindPassword extends React.Component {
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#findpassword_form'))
    }
    submit(e) {
        e.preventDefault()
        if (!_.isEmpty($("#findpassword_form").data("validator").invalid)) return
        // request("access/login", "POST", _.serializeForm(e.currentTarget), false).done(data => {
        //     localStorage['yy-dvy-token'] = data.token
        //     this.props.history.pushState(null, "/")
        // })
    }
    render() {
        return (
            <form id="findpassword_form" className="form-horizontal mt20" onSubmit={::this.submit} noValidate="novalidate">
                <legend>找回密码</legend>
                <div className="form-group">
                    <label htmlFor="username" className="col-sm-2 control-label">用户名</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="username" placeholder="用户名"
                            data-val="true" data-val-required="用户名是必填项."
                            data-val-length-min="4" data-val-length="用户名不能少于4个字符." />
                        <span className="field-validation-valid" data-valmsg-for="username" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">提交</button>
                        <Link to="login" className="fn-right">已有帐号？去登陆</Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default FindPassword(Login)

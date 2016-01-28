import request from '../request'
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class Login extends React.Component {
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#login_form'))
    }
    submit(e) {
        e.preventDefault()
        $(e.target).validator_judge().done(()=> {
            request("userone/admins/login", "POST", _.serializeForm(e.target)).done(res => {
                localStorage['yydvy_token'] = res.msg
                localStorage['yydvy_username'] = "Admin"
                this.props.history.pushState(null, "/")
            })
        })
    }
    render() {
        return (
            <form id="login_form" className="form-horizontal mt20" onSubmit={::this.submit} noValidate="novalidate">
                <legend>登录</legend>
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
                    <label htmlFor="password" className="col-sm-2 control-label">密码</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password" placeholder="密码"
                            data-val="true" data-val-required="密码是必填项."
                            data-val-length-min="6" data-val-length="密码不能少于6个字符." />
                        <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">提交</button>
                        <Link to="register" className="fn-right">没有帐号？去注册</Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default HistoryMixin(Login)

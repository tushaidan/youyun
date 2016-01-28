import request from '../request'
import HistoryMixin from '../history_mixin'
const Link = ReactRouter.Link

class Register extends React.Component {
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#register_form'))
    }
    submit(e) {
        e.preventDefault()
        $(e.target).validator_judge().done(()=> {
            let form = _.serializeForm(e.target)
            form.depName = "xx" // dirty
            form.address = "xx"
            request("userone/users/register", "POST", form).done(data => {
                if (!data.status) {
                    alert(data.msg)
                    return
                }
                this.props.history.pushState(null, "/login")
            })
        })
        // submitHandler: http://stackoverflow.com/a/4799723
    }
    render() {
        return (
            <form id="register_form" className="form-horizontal mt20" onSubmit={::this.submit} noValidate="novalidate">
                <legend>注册</legend>
                <div className="form-group">
                    <label htmlFor="username" className="col-sm-2 control-label">用户名</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" name="username" placeholder="用户名" id="username"
                             data-val="true" data-val-required="用户名是必填项."
                             data-val-length-min="4" data-val-length="用户名不能少于4个字符." />
                         <span className="field-validation-valid" data-valmsg-for="username" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="col-sm-2 control-label">邮箱</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" name="email" placeholder="Email" id="email"
                            data-val="true" data-val-required="Email是必填项." data-val-email="Email格式不正确" />
                        <span className="field-validation-valid" data-valmsg-for="email" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-sm-2 control-label">密码</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="pwd" placeholder="密码" id="password"
                            data-val="true" data-val-required="密码是必填项."
                            data-val-length-min="6" data-val-length="密码不能少于6个字符." />
                        <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-sm-2 control-label">确认密码</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" name="password_again" placeholder="确认密码" id="password_again"
                            data-val="true" data-val-equalto="密码输入不一致" data-val-equalto-other="password" />
                        <span className="field-validation-valid" data-valmsg-for="password_again" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">提交</button>
                        <Link to="login" className="fn-right">已有帐号？去登录</Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default HistoryMixin(Register)

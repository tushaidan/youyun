class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit_name: false,
            edit_mobile: false,
            edit_company: false,
            edit_industry: false,
            edit_post: false,
            data:{
                name: "cheney",
                mobile: "12434423321",
                company: "cooyi",
                industry: "互联网",
                post: "工程师",
            }
        }
    }
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#profile_form'))
        $.validator.unobtrusive.parse(document.querySelector('#password_form'))
    }
    submitProfile(e) {

    }
    submitPassword(e) {

    }
    editInput(e) {
        this.state[`edit_${e.currentTarget.dataset.name}`] = true
        this.forceUpdate()
    }
    submitProfile(e) {
        e.preventDefault()
        if (!_.isEmpty($("#profile_form").data("validator").invalid)) return
        // request("access/login", "POST", _.serializeForm(e.currentTarget)).done(data => {
        //     localStorage['yydvy_token'] = data.token
        //     this.props.history.pushState(null, "/")
        // })
    }
    submitPassword(e) {
        e.preventDefault()
        if (!_.isEmpty($("#password_form").data("validator").invalid)) return
        // request("access/login", "POST", _.serializeForm(e.currentTarget)).done(data => {
        //     localStorage['yydvy_token'] = data.token
        //     this.props.history.pushState(null, "/")
        // })
    }
    render() {
        return (
            <div id="setting">
                <ul className="nav nav-tabs">
                    <li className="active">
                        <a data-target="#profile" data-toggle="tab">个人信息</a>
                    </li>
                    <li>
                        <a data-target="#password" data-toggle="tab">修改密码</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="profile">
                        <form id="profile_form" className="form-horizontal infos" onSubmit={::this.submitProfile}>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">邮箱：</label>
                                <div className="col-sm-10">
                                    zicjin@gmail.com
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">姓名：</label>
                                <div className="col-sm-10">
                                    <input type="text" name="name" className={this.state.edit_name? "form-control": "fn-none"} placeholder="等级" />
                                    <span className={this.state.edit_name? "fn-none": ""}>{this.state.data.name}</span>
                                    <i className={this.state.edit_name? "fn-none": "glyphicon glyphicon-edit"} onClick={::this.editInput} data-name="name"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">手机：</label>
                                <div className="col-sm-10">
                                    <input type="text" name="mobile" className={this.state.edit_mobile? "form-control": "fn-none"} placeholder="手机" />
                                    <span className={this.state.edit_mobile? "fn-none": ""}>{this.state.data.mobile}</span>
                                    <i className={this.state.edit_mobile? "fn-none": "glyphicon glyphicon-edit"} onClick={::this.editInput} data-name="mobile"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">企业：</label>
                                <div className="col-sm-10">
                                    <input type="text" name="company" className={this.state.edit_company? "form-control": "fn-none"} placeholder="企业" />
                                    <span className={this.state.edit_company? "fn-none": ""}>{this.state.data.company}</span>
                                    <i className={this.state.edit_company? "fn-none": "glyphicon glyphicon-edit"} onClick={::this.editInput} data-name="company"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">行业：</label>
                                <div className="col-sm-10">
                                    <input type="text" name="industry" className={this.state.edit_industry? "form-control": "fn-none"} placeholder="行业" />
                                    <span className={this.state.edit_industry? "fn-none": ""}>{this.state.data.industry}</span>
                                    <i className={this.state.edit_industry? "fn-none": "glyphicon glyphicon-edit"} onClick={::this.editInput} data-name="industry"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-2 control-label">岗位：</label>
                                <div className="col-sm-10">
                                    <input type="text" name="post" className={this.state.edit_post? "form-control": "fn-none"} placeholder="岗位" />
                                    <span className={this.state.edit_post? "fn-none": ""}>{this.state.data.post}</span>
                                    <i className={this.state.edit_post? "fn-none": "glyphicon glyphicon-edit"} onClick={::this.editInput} data-name="post"></i>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <input type="submit" className="btn btn-primary" value="保存"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="tab-pane" id="password">
                        <form id="password_form" className="form-horizontal mt20" onSubmit={::this.submitPassword} noValidate="novalidate">
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2 control-label">当前密码</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password" placeholder="当前密码"
                                        data-val="true" data-val-required="密码是必填项."
                                        data-val-length-min="6" data-val-length="密码不能少于6个字符." />
                                    <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2 control-label">新密码</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password" placeholder="新密码" id="password"
                                        data-val="true" data-val-required="密码是必填项."
                                        data-val-length-min="6" data-val-length="密码不能少于6个字符." />
                                    <span className="field-validation-valid" data-valmsg-for="password" data-valmsg-replace="true"></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-sm-2 control-label">确认新密码</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" name="password_again" placeholder="确认新密码" id="password_again"
                                        data-val="true" data-val-equalto="密码输入不一致" data-val-equalto-other="password" />
                                    <span className="field-validation-valid" data-valmsg-for="password_again" data-valmsg-replace="true"></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-default">提交</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Setting

import ElasticityConfig from "../modules/elasticityConfig"

class ServiceElasticity extends React.Component {
    componentDidMount() {
        $.validator.unobtrusive.parse(document.querySelector('#elasticity_form'))
    }
    onSubmit(e) {
        e.preventDefault()
        if (!_.isEmpty($("#elasticity_form").data("validator").invalid)) return
        request("elasticity", "POST", _.serializeForm(e.currentTarget)).done(data => {
            alert("更新完成！")
        })
    }
    render() {
        return (
            <form id="elasticity_form" className="form-horizontal mt20" onSubmit={::this.onSubmit} noValidate="novalidate">
                <ElasticityConfig />
                <div className="form-group">
                    <button type="submit" className="btn btn-default">提交</button>
                </div>
            </form>
        )
    }
}

export default ServiceElasticity

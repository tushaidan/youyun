// https://github.com/rackt/react-router/blob/fe9358adc864c556afff6fd472476ab84ce2d7d9/docs/api/History.md#but-im-using-classes
// http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html
export default function(Component) {
    return React.createClass({
        mixins: [ReactRouter.History],
        render() {
            return <Component {...this.props} history={this.history}/>
        }
    })
}

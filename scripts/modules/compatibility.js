// import ie from "ie-version"

class Compatibility extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     idname: (ie.version && ie.version <= 8)? '': 'fn-none'
        // }
    }
    render() {
        return (
            <div dangerouslySetInnerHTML={{__html: Compatibility.conditional_template}}></div>
        )
    }
    static conditional_template = `
        <!--[if lte IE 8]>
            <div id='Compatibility'>
                <p class='title'>您的浏览器已经Out啦 >_< <span>推荐使用以下先进的浏览器。也可以使用360、搜狗等浏览器的极速模式……</span></p>
                <p><a href='http://www.google.com/chrome' class='chrome'></a>
                <a href='http://www.firefox.com/' class='firefox'></a>
                <a href='http://windows.microsoft.com/ie' class='ie10'></a></p>
                <p>@uyun.com</p>
            </div>
        <![endif]-->
    `;
}

export default Compatibility

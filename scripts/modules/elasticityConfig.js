class ElasticityConfig extends React.Component {

    render() {
        return (
            <div>
                <legend>弹性策略</legend>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name="isElasticity" />
                        是否启动弹性策略
                    </label>
                </div>
                <div className="form-group mt10">
                    <label className="col-sm-2 control-label">节点范围：</label>
                    <div className="col-sm-10">
                        <input type="number" name="minNodeNum" className="form-control" /> ~ <input type="number" name="maxNodeNum" className="form-control" />
                    </div>
                </div>

                <legend>扩展策略配置</legend>
                <div className="form-group">
                    <div className="col-md-5 col-sm-offset-2">
                        增加节点
                    </div>
                    <div className="col-md-5">
                        停止节点
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">平均CPU利用率</label>
                    <div className="col-md-5">
                        <input type="number" className="form-control" /> %
                    </div>
                    <div className="col-md-5">
                        <input type="number" className="form-control" /> %
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">平均内存利用率</label>
                    <div className="col-md-5">
                        <input type="number" className="form-control" /> %
                    </div>
                    <div className="col-md-5">
                        <input type="number" className="form-control" /> %
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-2 control-label">平均负载</label>
                    <div className="col-md-5">
                        <input type="number" className="form-control" />
                    </div>
                    <div className="col-md-5">
                        <input type="number" className="form-control" />
                    </div>
                </div>

                <legend>扩展策略参数</legend>
                <div className="row">
                    <div className="col-md-6">
                        <p>增加节点</p>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">每次增加节点个数</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">阈值超过时限</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" /> min
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">新增节点后忽略度量</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" /> min
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <p>停止节点</p>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">每次停止节点个数</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">阈值超过时限</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" /> min
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-4 control-label">停止节点后忽略度量</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" /> min
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ElasticityConfig

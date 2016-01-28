export const access = {
    "aliyun": "阿里云",
    "cloudstack": "cloudstack",
    "qingcloud": "青云",
    "aws": "亚马逊",
    "openstack": "openstack"
}

export let accessOption = Object.keys(access).map(function(value, index) {
    return {
        value: value,
        label: access[value]
    }
})

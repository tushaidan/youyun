export let types = {
    1: "经典网络",
    2: "专有网络",
}

export let typesOption = Object.keys(types).map(function(value, index) {
    return {
        value: value,
        label: types[value]
    }
})

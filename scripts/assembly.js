import {debug} from "./config"

ZeroClipboard.config({
    swfPath: "images/ZeroClipboard.swf"
})

$(document).on("ajaxError", function (event, request) {
    if (request.status == 403 || request.status == 401) {
        alert("认证失败：403/401")
        localStorage && localStorage.removeItem('yyuser')
        window.location.href = '#/login'
    } else if (request.status == 400) {
        if (debug)
            alert("请求错误：400")
    } else if (request.status == 502 || request.status == 500) {
        alert("服务端错误：" + request.status)
    } else {
        alert("错误：" + request.status)
    }
}).on("ajaxSuccess", function (event, request) { // dirty
    if (request.status == 200) {
        if (request.responseJSON && request.responseJSON.status == "fail")
            alert("错误：" + request.responseJSON.msg)
    }
})

$.fn.select3 = function (callback) {
    if (callback)
        return this.select2().off("select2:select").on("select2:select", callback)
    else
        return this.select2()
}

// https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
// If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send AJAX requests, perform those operations in this method.
$.fn.validator_judge = function () {
    let deferred = $.Deferred()
    _.delay(()=> {
        if (!_.isEmpty(this.data("validator").invalid))
            deferred.reject()
        else {
            deferred.resolve()
        }
    }, 0)
    return deferred.promise()
}

jQuery.validator.setDefaults({
    debug: debug,
    success: "valid"
})

_.serializeForm = function (form) {
    let data = {}
    $(form).serializeArray().map(function(x) {
        data[x.name] = x.value;
    })
    return data
}

$.fn.select2.defaults.set("minimumResultsForSearch", "Infinity") // default 0
$.fn.select2.defaults.set("language", { noResults: function() { return "..." }})

export let getHeight = function() {
    return $(window).height() - 65
}

// https://github.com/sciactive/pnotify
// http://sciactive.com/pnotify/#stacks
PNotify.prototype.options.styling = "bootstrap3"
const stack_alert = {"dir1": "down", "dir2": "left", "context": $("body")}
window.alert = function(title, text) {
    new PNotify({
        title: title,
        text: text || "",
        stack: stack_alert,
        addclass: "stack-modal",
        buttons: {
            closer: true,
            closer_hover: true
        },
    })
}
window.confirm = function(title) {
    let deferred = $.Deferred()
    let notify = new PNotify({
        title: title,
        icon: 'glyphicon glyphicon-question-sign',
        hide: false,
        confirm: {
            confirm: true
        },
        buttons: {
            closer: false,
            sticker: false
        }
    })
    notify.get().on('pnotify.confirm', function() {
        deferred.resolve()
    }).on('pnotify.cancel', function() {
        deferred.reject()
    })
    return deferred.promise()
}

export let ACTIVE = { color: 'blue' }

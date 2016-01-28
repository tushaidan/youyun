import {mock, host, user_host} from "./config"

export default function(url, is_mock = false) {
    is_mock = is_mock && mock
    let _host = is_userone(url)? user_host: host
    let local = is_mock? mock: _host
    return local + url
}

const userone = ["userone/users/register", "userone/admins/login"]
const is_userone = function(url) {
    return userone.includes(url)
}

// const api_adaptor = function(url, is_mock = false) {
//     if (!url) return
//
//     const map = {
//         "access/register": is_mock? "access/register": "userone/users/register",
//         "access/login": is_mock? "access/login": "userone/admins/login",
//         // "pandect": mock? "pandect": "pandect", // Todo
//     }
//
//     if (map[url])
//         return map[url]
//
//     // let match3 = url.match(/clouds\/cloudaccount\/(.+)/g) // clouds/cloudaccount/:id
//     // if (match3 && match3.length)
//     //     return match3[0]
//
//     return url
// }

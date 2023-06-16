import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? "https://api.xinyaotrip.com" : "http://localhost:8100",
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // const AccessToken = (new UserService()).getAccessToken()
    const AccessToken = ""

    config.withCredentials = true
    config.headers = {
        "Authorization": "Bearer " + AccessToken
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export const RequestPost = async <T>(api: string, params: any) => {
    return instance.post<T>(api, params)
        .then((res) => res.data)
}

export const RequestGet = async <T>(api: string, query: string = "") => {
    const url = api + "?" + query
    return instance.get<T>(url)
        .then((res) => res.data)
}

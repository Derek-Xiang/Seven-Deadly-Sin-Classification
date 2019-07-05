import JsonP from 'jsonp'
import axios from 'axios'
export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                if (response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            //loading.style.display = 'block';
        }
        let baseApi = 'http://172.26.38.184:5000/get_data';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    //loading.style.display = 'none';
                }
                if (response.status == '200'){
                    let res = response.data;
                    resolve(res);
                    

                }else{
                    reject(response.data);
                }
            })
        });
    }
}
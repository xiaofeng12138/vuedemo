let baseURL = '' 
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    baseURL = 'api/' // 开发
} else if (process.env.NODE_ENV === 'testing') {
    baseURL = 'https://www.tradeportal.sh.cn'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://www.tradeportal.sh.cn' // 环境
} 

//导出
export default baseURL
const logoPlatform = {
    github:'/logo/github.png',
    google:'/logo/google.png'
}
const getLogoPlatform = (platform='') =>{
    return logoPlatform[platform.toLowerCase()];
}
export default getLogoPlatform;
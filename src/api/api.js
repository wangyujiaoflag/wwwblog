import { get, post } from './http'

/****************************************************************
 *关于用户登录
 */


// 注册
export function regesiter({loginName,password}) {
  return post('/user/user/signIn',{loginName,password})
}

// 登录
export function login({loginName,password}) {
  return post('/user/user/login',{loginName,password})
}

// 登出
export function logout() {
  return get('/user/user/logout');
}

// 修改密码
export function changePassword({loginName,oldPassword,newPassword}) {
  return post('/user/user/changePassword',{loginName,oldPassword,newPassword})
}


/****************************************************************
 *关于文章
 */

// 文章图片上传  这个竟然是两个对象不用包在一起
export function upImage(formData,config) {
  return post('/user/file/noCheck/upload',formData,config)
}

// 保存文章 type:0-草稿 1-发布（需要审核后才能成为发布状态）
// type、title、content、author相关、sortForm、tagForm
export function saveArticle({type,title,content,userId,sortForm,tagForm}) {
  return post('',{type,title,content,userId,sortForm,tagForm})
}

// 新增文章
export function addFile({status,title,content,type,label}) {
  return post('/blog/blog/addBlog',{status,title,content,type,label})
}

// 修改文章
export function changeFile({fileId,userId}) {
  return post('',{fileId,userId})
}
// 删除文章
export function delFile({fileId,userId,sortId}) {
  return post('',{fileId,userId,sortId})
}

// 查找文章
export function findBlog({page,size,keywords,time,type,sort}) {
  return post('',{page,size,keywords,time,type,sort})
}

// 获取文章分类 自己设置的
export function getSortOptions() {
  return get('')
}

/**
 * 后台管理
 */

// 修改用户信息、修改个人信息
export function editPeopleInfo(){
  return post('',)
}

// 删除博客分类的文件夹
// export function editPeopleInfo(){
//   return post('',)
// }

// 修改博客分类的名称等信息
// export function editPeopleInfo(){
//   return post('',)
// }
// export function editPeopleInfo(){
//   return post('',)
// }

// 缓存封装

var storage = {
  // 获取缓存
  get(key) {
    return localStorage.getItem(key);
  },

  // 设置缓存
  set(key,value) {
    localStorage.setItem(key,value);
    
  },

  // 清除缓存
  clear() {
    localStorage.clear();
  }
}

export default storage;
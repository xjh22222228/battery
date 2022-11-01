import http from '@/utils/http'

// 通过账号密码登录
export function serviceLogin(data: object) {
  return http.post('/passport/local', data)
}

// 退出登录
export function serviceLogout() {
  return http.get('/logout')
}

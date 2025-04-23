export const validate = {
  // 正则表达式验证手机号格式
  mobile: (mobile = '') => {
    const isValid = /^1[3-9]\d{9}$/.test(mobile);
    return !isValid ? '手机号格式错误' : '';
  },
  // 验证码格式校验
  code: (code = '') => {
    const isValid = /^\d{6}$/.test(code);
    return !isValid ? '请输入6位数字验证码' : '';
  },
}

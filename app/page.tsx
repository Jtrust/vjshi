'use client'
import useLogin from "@/app/useLogin";
import './home.css'

export default function Home() {
  const {
    isCodeButtonDisabled, // 获取验证码按钮禁用状态
    formData, // 表单数据
    currentCount, // 倒计时数字
    submitting, // 提交状态
    handleInputChange, // 表单数据采集
    getCode, // 获取验证码
    handleSubmit, // 提交表单
  } = useLogin()

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="form-item">
        <input
          placeholder="手机号"
          name="mobile"
          value={formData?.mobile?.value}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'mobile')}
        />
        {formData?.mobile?.errorMsg && <p className="form-error">{formData?.mobile?.errorMsg}</p>}
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示“请输入手机号”
        2.格式校验，需满足国内手机号规则，错误提示“手机号格式错误”
        举例：<p className="form-error">手机号格式错误</p> */}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input
            placeholder="验证码"
            name="code"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value, 'code')}
          />
          {formData?.code?.errorMsg && <p className="form-error">{formData?.code?.errorMsg}</p>}
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button
            className="getcode cursor-pointer"
            disabled={isCodeButtonDisabled}
            onClick={getCode}
          >
            {currentCount ? `${currentCount}s` : '获取验证码'}
          </button>
        </div>
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示“请输入验证码”
        2.格式校验，6位数字，错误提示“验证码格式错误”
        举例：<p className="form-error">验证码格式错误</p> */}
      </div>

      {/* 表单提交中，按钮内的文字会变成“submiting......” */}
      <button className="submit-btn" onClick={handleSubmit}>{submitting ? 'submitting...' : '登录'}</button>
    </form>
  );
}

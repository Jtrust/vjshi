import {useMemo, useState} from "react";
import useCountdown from "@/app/hooks/useCountDown";
import {validate} from "@/app/utils/validate";

export interface FormData {
  mobile: {
    value?: string;
    errorMsg?: string;
  };
  code: {
    value?: string;
    errorMsg?: string;
  };
}

const initialFormData: FormData = {
  mobile: {
    value: '',
    errorMsg: ''
  },
  code: {
    value: '',
    errorMsg: ''
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const validateForm = (formData: FormData) => {
  let hasError = false;
  const currentData: FormData = {...formData}
  // 验证表单字段
  Object.keys(formData).forEach((key) => {
    const field = key as keyof FormData;
    const value = formData[field]?.value || '';
    const errorMsg = validate[field]?.(value)
    if (errorMsg) { // 验证失败
      hasError = true
      currentData[field] = {
        value: formData[field]?.value,
        errorMsg: validate[field]?.(value)
      }
    }
  });
  const formValues = Object.fromEntries(
    Object.entries(formData).map(([key, {value}]) => [key, value])
  );
  return {hasError, currentData, formValues}
}

const useLogin = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData); // 表单数据
  const [submitting, setSubmitting] = useState<boolean>(false); // 提交状态
  const {currentCount, startCountdown} = useCountdown(); // 倒计时数字

  // 获取验证码按钮禁用状态
  const isCodeButtonDisabled = useMemo(() => {
    if (currentCount > 0) {
      return true
    }
    if (!formData?.mobile?.value) {
      return true
    }
    if (validate?.mobile?.(formData?.mobile?.value)) {
      return true
    }
    return false
  }, [formData?.mobile?.value, currentCount]);

  // 表单数据采集
  const handleInputChange = (value: string, name: keyof FormData) => {
    setFormData({
      ...formData,
      [name]: {
        value,
        errorMsg: ''
      }
    });
  }

  const handleSubmit = async () => {
    const {
      hasError,
      currentData,
      formValues
    } = validateForm(formData)
    // 如果有错误 设置错误提示
    if (hasError) {
      setFormData(currentData);
      return;
    }
    // 如果没有错误，提交表单
    setSubmitting(true)
    console.log('Submitting form data:', formValues);
    await sleep(1000); // 模拟异步请求
    window.location.href = 'https://www.vjshi.com/'
  };

  // 获取验证码
  const getCode = () => {
    const mobileErr = validate.mobile(formData?.mobile?.value)
    if (mobileErr) {
      setFormData({
        ...formData,
        mobile: {
          ...formData.mobile,
          errorMsg: mobileErr
        }
      })
      return;
    }
    startCountdown(60); // 开始倒计时
    // 模拟发送验证码
  }

  return {
    isCodeButtonDisabled, // 获取验证码按钮禁用状态
    formData, // 表单数据
    currentCount, // 倒计时数字
    submitting, // 提交状态
    handleInputChange, // 表单数据采集
    getCode, // 获取验证码
    handleSubmit, // 提交表单
  }
}

export default useLogin;

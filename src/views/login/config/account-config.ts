export const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 16, message: 'Length should be 3 to 16', trigger: 'blur' }
  ]
}

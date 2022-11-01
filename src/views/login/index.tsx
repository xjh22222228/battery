// https://007.qq.com/quick-start.html?ADTAG=acces.cfg
import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'
import Footer from '@/components/footer'
import qs from 'query-string'
import md5 from 'blueimp-md5'
import config from '@/config'
import { isEmpty } from 'lodash'
import { Button, Input, message, Form } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { SET_USER_INFO } from '@/store/userSlice'
import { serviceLogin } from '@/services/user'
import { LOCAL_STORAGE } from '@/constants'
import { useAppDispatch } from '@/hooks'
import logo from '@/assets/img/common/logo.png'
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'

const LOGIN_NAME = localStorage.getItem(LOCAL_STORAGE.LOGIN_NAME) || ''

export default function () {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const redirectUrl = useMemo(() => {
    const url = qs.parse(location.search).redirectUrl as string
    return url || '/home/index'
  }, [])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()

      setLoading(true)
      serviceLogin({
        loginName: values.loginName.trim(),
        password: md5(values.password.trim()),
        code: values.code.trim()
      })
        .then(res => {
          setLoading(false)
          dispatch(SET_USER_INFO(res.userInfo))
          navigate(redirectUrl, { replace: true })
        })
        .catch(() => {
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="login-page">
      <div className="wrap">
        <div>
          <div className="logo-wrap">
            <img src={logo} className="logo" alt="" />
            <em>{config.title}</em>
          </div>

          <Form form={form}>
            <Form.Item
              name="loginName"
              initialValue={LOGIN_NAME}
              rules={[
                {
                  required: true,
                  message: "请输入用户名"
                }
              ]}
            >
              <Input
                placeholder="用户名"
                prefix={<UserOutlined />}
                maxLength={32}
                autoComplete="off"
                onPressEnter={handleSubmit}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码"
                }
              ]}
            >
              <Input
                placeholder="密码"
                prefix={<LockOutlined />}
                maxLength={32}
                type="password"
                autoComplete="off"
                onPressEnter={handleSubmit}
              />
            </Form.Item>
          </Form>

          <Button
            type="primary"
            style={{ marginTop: '20px' }}
            size="large"
            loading={loading}
            block
            onClick={handleSubmit}
          >
            {loading ? '登 录 中...' : '登 录'}
          </Button>
        </div>
      </div>
      <Footer />
    </section>
  )
}

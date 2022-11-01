import React from 'react'
import './style.scss'
import CONFIG from '@/config'

const currentYear = new Date().getFullYear()

export default () => {
  return (
    <footer className="global-footer">
      <div>
        Copyright &copy; 2022-{currentYear} Go Go Go
      </div>
    </footer>
  )
}

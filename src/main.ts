import kaboom from 'kaboom'
import { component } from './compexporttest';
import './style.css'

window.K = kaboom({
  width: 320,
  height: 180,
  crisp: true,
  stretch: true,
  letterbox: true,
})

component()
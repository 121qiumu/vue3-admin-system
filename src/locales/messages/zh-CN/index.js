import app from './app'
import common from './common'
import dashboard from './dashboard'
import error from './error'
import layout from './layout'
import login from './login'
import permission from './permission'
import route from './route'
import system from './system'
import validation from './validation'

export default {
  ...app,
  ...common,
  ...dashboard,
  ...error,
  ...layout,
  ...login,
  ...permission,
  ...route,
  ...system,
  ...validation
}

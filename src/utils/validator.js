export default {
  // 验证图片数组
  arrLength (rule, value, callback) {
    // length: 限定几张，minlength: 限定最少几张，maxlength： 限定最多几张
    if (rule.length !== undefined) {
      if (value.length !== rule.length) {
        callback(new Error('必须上传' + rule.length + '个'))
      } else {
        callback()
      }
    }
    if (rule.maxlength !== undefined) {
      if (rule.length !== undefined) { return } // 不能在限制最少数量时限制具体数量
      if (value.length > rule.maxlength) {
        callback(new Error('必须上传不超过' + rule.maxlength + '个'))
      } else {
        if (rule.minlength !== undefined) {
          if (value.length < rule.minlength) {
            callback(new Error('必须上传不少与' + rule.minlength + '个'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
    if (rule.minlength !== undefined) {
      if (rule.length !== undefined) { return } // 不能在限制最多数量时限制具体数量
      if (value.length < rule.minlength) {
        callback(new Error('必须上传不少与' + rule.minlength + '张图片'))
      } else {
        if (rule.maxlength !== undefined) {
          if (value.length > rule.maxlength) {
            callback(new Error('必须上传不超过' + rule.maxlength + '张图片'))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
  },
  // 验证数量与数值
  validatorAmount (rule, value, callback) {
    // amout: 最少数量，maxamout: 最多数量，decimaldigit: 数值小数位位数
    if (rule.amout === undefined) {
      callback(new Error('请在验证时添加amout，来设置所填数值不能少于amout下限'))
    }
    if (value < rule.amout) {
      callback(new Error(rule.ruleName + '所填数值不能少于' + rule.amout))
    } else {
      if (value > rule.maxamout) {
        callback(new Error(rule.ruleName + '所填数值不能大于' + rule.maxamout))
      } else {
        if (value.toString().indexOf('.') !== -1) {
          if (value.toString().split('.')[1].length > rule.decimaldigit) {
            callback(new Error(rule.ruleName + '所填数值小数位不能大于' + value.toString().split('.')[1].length))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
    }
  },
  // 验证特殊字符
  validatorSpecialChara (rule, value, callback) {
    let warning = true
    if (rule.warning !== undefined) {
      warning = rule.warning
    }
    // allow: 允许的特殊字符
    var specialKey = "[`~!#$^&*()（）=|{}':;',\\[\\].<>/?~！#￥……&*（）--——|{}【】‘；：”“'。，、？] -+‘'《》%"
    var flg = false
    if (value === null) {
      return
    }
    for (var i = 0; i < value.length; i++) {
      if (specialKey.indexOf(value[i]) >= 0) {
        if (rule.allow === undefined) { // 如果不包含允许字符则直接进行是否允许输入验证
          flg = true
          break
        }
        if (rule.allow.indexOf(value[i]) >= 0) { // 如果包含允许字符则允许输入
          flg = false
        } else {
          flg = true
          break
        }
      } else {
        flg = false
      }
    }
    if (flg) {
      if (warning) {
        callback(new Error('不能输入不被允许的特殊字符(包括空格)'))
      } else {
        callback(new Error(' '))
      }
    } else {
      callback()
    }
  },
  // 验证超长输入-请使用change事件
  validatorInputOverlength (rule, value, callback) {
    if (rule.minInputlength === undefined) {
      callback(new Error('请在验证时添加minInputlength，来设置所填输入字符不得少于minInputlength下限'))
    }
    if (rule.maxInputlength === undefined) {
      callback(new Error('请在验证时添加maxInputlength，来设置所填输入字符不得多于maxInputlength上限'))
    }
    if (value.length < rule.minInputlength) {
      callback(new Error(rule.ruleName + '所填输入字符不能少于' + rule.minInputlength))
    } else {
      if (value.length > rule.maxInputlength) {
        callback(new Error(rule.ruleName + '所填输入字符不能大于' + rule.maxInputlength))
      } else {
        callback()
      }
    }
  },
  validatorDateIsNull (rule, value, callback) {
    if (value === undefined) {
      callback(new Error('身份证起始日期不能为空'))
    } else {
      callback()
    }
  }
}

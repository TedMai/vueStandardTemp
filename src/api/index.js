var root = process.env.API_ADDR
var request = require('superagent')
var toType = function (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function FilterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (key === 'asset_id') {
        o[key] = +o[key]
      }
      if (o[key].length === 0) {
        delete o[key]
      }
    } else if (toType(o[key]) === 'object') {
      o[key] = FilterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = FilterNull(o[key])
    }
  }
  return o
}

function _apiBase (method, url, params, success, failure) {
  var r = request(method, url).type('text/plain').withCredentials()
  if (params) {
    params = FilterNull(params)
    if (method === 'POST' || method === 'PUT') {
      if (toType(params) === 'object') {
        params = JSON.stringify(params)
      }
      r = r.send(params)
    } else if (method === 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function (err, res) {
    if (err) {
      if (res.status === 401) {
        window.location.href = '#/login'
      } else {
        window.alert('api error, HTTP CODE: ' + res.status)
        return
      }
    }
    if (res.body.status === 0) {
      if (success) {
        success(res.body)
      }
    } else {
      if (failure) {
        failure(res.body)
      } else {
        window.alert(res.body.data)
      }
    }
  })
}
export default {
  get: function (url, params, success, failure) {
    return _apiBase('GET', root + '/' + url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return _apiBase('POST', root + '/' + url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return _apiBase('PUT', root + '/' + url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return _apiBase('DELETE', root + '/' + url, params, success, failure)
  }
}

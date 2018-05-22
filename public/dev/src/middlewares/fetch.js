import { showNotification } from '~/actions/notificationActions'

const getApiUrl = (url) => {
  if (/^http[s]*:\/\/.+/.test(url)) {
    return url
  }
  return `http://astro-1765779789.ap-southeast-1.elb.amazonaws.com/schedules/api/v1/${url}`
}

const getEncodedUrlParams = params => Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&')

const timeoutPromise = (timeout, err, promise) =>
new Promise((resolve,reject) => {
  promise.then(resolve,reject)
  setTimeout(reject.bind(null,err), timeout)
})

const fetchMiddleware = store => next => (action) => {
  if (!action || !action.request) {
    return next(action)
  }

  const {
    url = '/',
    method = 'GET',
    headers = {}
  } = action.request

  const body = ['POST'].indexOf(method) >= 0 && action.params
    ? getEncodedUrlParams(action.params)
    : undefined

  const queryParams = ['GET'].indexOf(method) >= 0 && action.params
    ? `?${getEncodedUrlParams(action.params)}`
    : ''

  timeoutPromise(10000, new Error('Request Timed Out!'), fetch(`${getApiUrl(url)}${queryParams}`, {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...headers
    },
    body
  })).then((response) => {
    if (!response.ok && response.status >= 500 && response.statusText) {
      throw Error(response.statusText)
    }
    return response.json()
  }).then(({ data, message }) => {
    if (!data) {
      throw Error(message)
    }
    store.dispatch({
      type: `${action.type}_OK`,
      params: action.params,
      data
    })
  }).catch((error) => {
    if (typeof error === 'object') {
      error = error.message
    }
    store.dispatch({
      type: `${action.type}_ERROR`,
      params: action.params,
      data: error
    })
    store.dispatch(showNotification(error))
  })

  return next(action)
}

export default fetchMiddleware

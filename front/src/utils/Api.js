import axios from 'axios';

// 응답 성공 실패 구분
export const ApiType = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}

/**
 * get 요청을 보냅니다
 * @param {string} url 요청 url
 * @returns {Promise<any>} 비동기 응답
 */
export const getApi = (url, params) => axios.get(url, { params })
  .then(res => ({ type: ApiType.SUCCESS, body: res.data }))
  .catch(err => ({ type: ApiType.FAILURE, body: err.response.data }))
  .then(res => res.type === ApiType.SUCCESS ? res.body : Promise.reject(res.body));

/**
 * post 요청을 보냅니다
 * @param {string} url 요청 url
 * @param {any} data 요청 데이터
 * @returns {Promise<any>} 비동기 응답
 */
export const postApi = (url, data) => axios.post(url, data)
  .then(res => ({ type: ApiType.SUCCESS, body: res.data }))
  .catch(err => ({ type: ApiType.FAILURE, body: err.response.data }))
  .then(res => res.type === ApiType.SUCCESS ? res.body : Promise.reject(res.body));

/**
 * delete 요청을 보냅니다
 * @param {string} url 요청 url
 * @returns {Promise<any>} 비동기 응답
 */
export const deleteApi = url => axios.delete(url)
  .then(res => ({ type: ApiType.SUCCESS, body: res.data }))
  .catch(err => ({ type: ApiType.FAILURE, body: err.response.data }))
  .then(res => res.type === ApiType.SUCCESS ? res.body : Promise.reject(res.body));

/**
 * put 요청을 보냅니다
 * @param {string} url 요청 url
 * @param {any} data 요청 데이터
 * @returns {Promise<any>} 비동기 응답
 */
export const putApi = (url, data) => axios.put(url, data)
  .then(res => ({ type: ApiType.SUCCESS, body: res.data }))
  .catch(err => ({ type: ApiType.FAILURE, body: err.response.data }))
  .then(res => res.type === ApiType.SUCCESS ? res.body : Promise.reject(res.body));
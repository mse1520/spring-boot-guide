import axios from 'axios';

// 응답 성공 실패 구분
const HttpStatus = {
  Success: 'SUCCESS',
  Failure: 'FAILURE'
}

/**
 * get 요청을 보냅니다
 * @param {string} url 요청 url
 * @returns {Promise<any>} 비동기 응답
 */
export const getApi = url => axios.get(url)
  .then(res => ({ type: HttpStatus.Success, body: res.data }))
  .catch(err => ({ type: HttpStatus.Failure, body: err.response.data }))
  .then(res => res.type === HttpStatus.Success ? res.body : Promise.reject(res.body));

/**
 * post 요청을 보냅니다
 * @param {string} url 요청 url
 * @param {any} data 요청 데이터
 * @returns {Promise<any>} 비동기 응답
 */
export const postApi = (url, data) => axios.post(url, data)
  .then(res => ({ type: HttpStatus.Success, body: res.data }))
  .catch(err => ({ type: HttpStatus.Failure, body: err.response.data }))
  .then(res => res.type === HttpStatus.Success ? res.body : Promise.reject(res.body));

/**
 * delete 요청을 보냅니다
 * @param {string} url 요청 url
 * @param {any} data 요청 데이터
 * @returns {Promise<any>} 비동기 응답
 */
export const deleteApi = (url, data) => axios.delete(url, data)
  .then(res => ({ type: HttpStatus.Success, body: res.data }))
  .catch(err => ({ type: HttpStatus.Failure, body: err.response.data }))
  .then(res => res.type === HttpStatus.Success ? res.body : Promise.reject(res.body));

/**
 * message를 담은 post 요청을 보냅니다
 * @param {string} url 요청 url
 * @param {any} data 요청 데이터
 * @returns {Promise<any>} 비동기 응답
 */
export const postMessageApi = (url, data) => postApi(url, data)
  .then(data => data.type === HttpStatus.Success ? data : Promise.reject(data));
/**
 * 길이만큼 특정문자를 채워넣습니다
 * @param {string} target 채워넣을 대상
 * @param {number} length 채워넣을 길이
 * @param {string} [char='0'] 채워넣을 문자
 * @returns {string} 결과 문자열
 */
export const lPad = (target, length, char = '0') => {
  if (target.length > length) length = target.length;

  let pad = '';
  for (let i = 0; i < length; i++) pad += char;

  const _target = pad + target;
  return _target.substring(_target.length - length);
};

/**
 * 쿠키를 담은 객체를 문자열로 파싱해줍니다
 * @param {{ [string]: string; }} cookies 입력할 쿠키를 담은 객체
 * @returns {string} 파싱된 문자열
 */
export const cookieToString = cookies => Object.entries(cookies).map(cookie => cookie.join('=')).join('; ');
import CommentMode from '../../types/BoardDetail/CommentMode';
import { deleteApi, getApi, postApi, putApi } from '../../utils/api';
import { lPad } from '../../utils';

const getNow = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = lPad(now.getMonth() + 1, 2);
  const date = lPad(now.getDate(), 2);
  const hour = lPad(now.getHours(), 2);
  const minute = lPad(now.getMinutes(), 2);
  const second = lPad(now.getSeconds(), 2);
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};

export const getKey = boardId => (page, prevData) => prevData?.isLast ? null : [`/api/comment/info/${boardId}`, page];
export const commentFetcher = ([url, page]) => getApi(url, { page });

export const deleteComment = (data, commentId) => {
  const api = deleteApi(`/api/comment/info/${commentId}`);
  const _data = data.map(item => {
    const body = item.body.filter(comment => comment.id !== commentId);
    return { ...item, body };
  });

  return { api, data: _data };
};

export const enableModifying = (data, commentId) => data.map(item => {
  const body = item.body.map(comment => ({
    ...comment,
    mode: comment.id === commentId ? CommentMode.MODIFYING : CommentMode.DONE
  }));
  return { ...item, body };
});

export const cancelModifying = data => data.map(item => {
  const body = item.body.map(comment => ({ ...comment, mode: CommentMode.DONE }));
  return { ...item, body };
});

export const modifyComment = (data, commentId, content) => {
  const api = putApi(`/api/comment/info/${commentId}`, { content });
  const _data = data.map(item => {
    const body = item.body.map(comment =>
      comment.id === commentId
        ? { ...comment, content, updatedDate: getNow(), mode: CommentMode.DONE }
        : comment
    );
    return { ...item, body };
  })

  return { api, data: _data };
}

export const createComment = (data, boardId, content, username) => {
  const api = postApi('/api/comment/write', { boardId, content });
  const comment = { content, username, updatedDate: getNow() };
  const _data = data.map((item, i) =>
    data.length - 1 === i
      ? { ...item, body: [...item.body, comment] }
      : { ...item });

  return { api, data: _data };
};
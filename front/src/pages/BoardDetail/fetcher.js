import CommentMode from '../../types/BoardDetail/CommentMode';
import { deleteApi, getApi, postApi, putApi } from '../../utils/Api';

export const getKey = boardId => (page, prevData) => prevData?.isLast ? null : [`/api/comment/info/${boardId}`, page];
export const commentFetcher = ([url, page]) => getApi(url, { page });

export const deleteComment = (data, commentId) => deleteApi(`/api/comment/info/${commentId}`)
  .then(() => data.map(item => {
    const body = item.body.filter(comment => comment.id !== commentId);
    return { ...item, body };
  }));

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

export const modifyComment = (data, commentId, content) => putApi(`/api/comment/info/${commentId}`, { content })
  .then(v => v.body)
  .then(newComment => data.map(item => {
    const body = item.body.map(comment => comment.id === commentId ? newComment : comment);
    return { ...item, body };
  }));

export const createComment = (data, boardId, content) => postApi('/api/comment/write', { boardId, content })
  .then(v => v.body)
  .then(comment => data.map((item, i) =>
    data.length - 1 === i
      ? { ...item, body: [...item.body, comment] }
      : { ...item }));
import CommentMode from '../../types/BoardDetail/CommentMode';
import { lPad } from '../../utils';
import axios from 'axios';

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

export const getCommentKey = boardId => (page, prevData) => prevData?.isLast ? null : ['/api/comment/list', boardId, page];
export const commentFetcher = ([url, boardId, page]) => axios.get(url, { params: { boardId, page } }).then(res => res.data);

export const deleteComment = (mutate, { data, commentId }) => {
  const _data = data.map(item => {
    const body = item.body.filter(comment => comment.id !== commentId);
    return { ...item, body };
  });

  mutate(_data, { revalidate: false });
  axios.delete(`/api/comment/info/${commentId}`)
    .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
    .then(() => mutate());
};
export const enableEditing = (mutate, { data, commentId }) => {
  const _data = data.map(item => {
    const body = item.body.map(comment => ({
      ...comment,
      mode: comment.id === commentId ? CommentMode.EDITING : CommentMode.DONE
    }));
    return { ...item, body };
  });

  mutate(_data, { revalidate: false });
};
export const cancelEditing = (mutate, { data }) => {
  const _data = data.map(item => {
    const body = item.body.map(comment => ({ ...comment, mode: CommentMode.DONE }));
    return { ...item, body };
  });

  mutate(_data, { revalidate: false });
};

export const updateComment = (mutate, { data, commentId, content }) => {
  const _data = data.map(item => {
    const body = item.body.map(comment =>
      comment.id === commentId
        ? { ...comment, content, updatedDate: getNow(), mode: CommentMode.DONE }
        : comment
    );
    return { ...item, body };
  })

  mutate(_data, { revalidate: false });
  axios.put(`/api/comment/info/${commentId}`, { content })
    .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
    .then(() => mutate());
};

export const createComment = (mutate, { data, boardId, content, username }) => {
  const comment = { content, username, updatedDate: getNow() };
  const _data = data.map((item, i) =>
    data.length - 1 === i
      ? { ...item, body: [...item.body, comment] }
      : { ...item });

  mutate(_data, { revalidate: false });
  axios.post('/api/comment/write', { boardId, content })
    .catch(err => err.response.data?.message ? alert(err.response.data.message) : console.error(err))
    .then(() => mutate());
};
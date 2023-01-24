package kyh.api.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.comment.CommentInfo;
import kyh.api.domain.dto.comment.CommentWriteForm;
import kyh.api.domain.dto.common.MessageBox;
import kyh.api.domain.dto.common.MessageType;
import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;
import kyh.api.domain.entity.User;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.CommentRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;

  @Transactional
  public MessageBox<CommentInfo> wirte(CommentWriteForm form, Long userId) {
    Board findBoard = boardRepository.findById(form.getBoardId()).orElse(null);
    User findUser = userRepository.findById(userId).orElseThrow();

    if (findBoard == null)
      return new MessageBox<>(MessageType.FAILURE, "잘못된 게시글.");

    Comment comment = new Comment(form.getContent(), findBoard, findUser);
    Comment savedComment = commentRepository.save(comment);
    CommentInfo commentInfo = CommentInfo.generate(savedComment);

    return new MessageBox<>(MessageType.SUCCESS, "저장 성공.", commentInfo);
  }

  @Transactional
  public MessageBox<CommentInfo> delete(Long commentId, Long userId) {
    Comment findComment = commentRepository.findWithUserById(commentId).orElse(null);
    User findUser = userRepository.findById(userId).orElse(new User(null, null, null));

    if (findComment == null)
      return new MessageBox<>(MessageType.FAILURE, "존재하지 않는 댓글입니다.");
    if (findComment.getUser() != findUser)
      return new MessageBox<>(MessageType.FAILURE, "댓글을 삭제할 권한이 없습니다.");

    commentRepository.delete(findComment);
    CommentInfo commentInfo = CommentInfo.generate(findComment);
    return new MessageBox<>(MessageType.SUCCESS, "삭제 성공.", commentInfo);
  }

  @Transactional
  public MessageBox<CommentInfo> modify(Long commentId, Long userId, String content) {
    Comment findComment = commentRepository.findWithUserById(commentId).orElse(null);
    User findUser = userRepository.findById(userId).orElse(new User(null, null, null));

    if (findComment == null)
      return new MessageBox<>(MessageType.FAILURE, "존재하지 않는 댓글입니다.");
    if (findComment.getUser() != findUser)
      return new MessageBox<>(MessageType.FAILURE, "댓글을 수정할 권한이 없습니다.");

    findComment.changeContent(content);
    Comment savedComment = commentRepository.save(findComment);
    CommentInfo commentInfo = CommentInfo.generate(savedComment);
    return new MessageBox<>(MessageType.SUCCESS, "수정 성공.", commentInfo);
  }

}

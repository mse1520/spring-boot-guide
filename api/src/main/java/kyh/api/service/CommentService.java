package kyh.api.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.comment.CommentInfo;
import kyh.api.domain.dto.comment.CommentWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.Comment;
import kyh.api.domain.entity.Member;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.CommentRepository;
import kyh.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

  private final CommentRepository commentRepository;
  private final MemberRepository memberRepository;
  private final BoardRepository boardRepository;

  @Transactional
  public DataBox<CommentInfo> wirte(CommentWriteForm form, Long memberId) {
    Board findBoard = boardRepository.findById(form.getBoardId()).orElse(null);
    Member findMember = memberRepository.findById(memberId).orElseThrow();

    if (findBoard == null)
      return new DataBox<>(DataBoxType.FAILURE, "잘못된 게시글.");

    Comment comment = new Comment(form.getContent(), findBoard, findMember);
    Comment savedComment = commentRepository.save(comment);
    CommentInfo commentInfo = CommentInfo.generate(savedComment);

    return new DataBox<>(DataBoxType.SUCCESS, "저장 성공.", commentInfo);
  }

  public DataBox<List<CommentInfo>> list(Long boardId, Integer page) {
    PageRequest pageRequest = PageRequest.of(page, 20);
    Board board = boardRepository.findById(boardId).orElse(null);

    if (board == null)
      return new DataBox<>(DataBoxType.FAILURE, "조회된 게시글이 없습니다.");

    Page<Comment> pageComment = commentRepository.findWithMemberByBoard(board, pageRequest);
    List<CommentInfo> commentInfos = pageComment.map(CommentInfo::generate).toList();

    return new DataBox<>(DataBoxType.SUCCESS, pageComment.isLast(), pageComment.getTotalElements(), commentInfos);
  }

  @Transactional
  public DataBox<CommentInfo> delete(Long commentId, Long memberId) {
    Comment findComment = commentRepository.findWithMemberById(commentId).orElse(null);
    Member findMember = memberRepository.findById(memberId).orElse(new Member(null, null, null));

    if (findComment == null)
      return new DataBox<>(DataBoxType.FAILURE, "존재하지 않는 댓글입니다.");
    if (findComment.getMember() != findMember)
      return new DataBox<>(DataBoxType.FAILURE, "댓글을 삭제할 권한이 없습니다.");

    commentRepository.delete(findComment);
    CommentInfo commentInfo = CommentInfo.generate(findComment);
    return new DataBox<>(DataBoxType.SUCCESS, "삭제 성공.", commentInfo);
  }

  @Transactional
  public DataBox<CommentInfo> modify(Long commentId, Long memberId, String content) {
    Comment findComment = commentRepository.findWithMemberById(commentId).orElse(null);
    Member findMember = memberRepository.findById(memberId).orElse(new Member(null, null, null));

    if (findComment == null)
      return new DataBox<>(DataBoxType.FAILURE, "존재하지 않는 댓글입니다.");
    if (findComment.getMember() != findMember)
      return new DataBox<>(DataBoxType.FAILURE, "댓글을 수정할 권한이 없습니다.");

    findComment.changeContent(content);
    commentRepository.flush();
    CommentInfo commentInfo = CommentInfo.generate(findComment);
    return new DataBox<>(DataBoxType.SUCCESS, "수정 성공.", commentInfo);
  }

}

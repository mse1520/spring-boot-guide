package kyh.api.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.board.BoardInfo;
import kyh.api.domain.dto.board.BoardWriteForm;
import kyh.api.domain.dto.comment.CommentInfo;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.User;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.CommentRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final CommentRepository commentRepository;

  /** 게시글(Board) 작성 */
  @Transactional
  public DataBox<BoardInfo> write(BoardWriteForm boardWriteForm, Long UserId) {
    User user = userRepository.findById(UserId).orElseThrow();
    Board board = new Board(boardWriteForm.getTitle(), boardWriteForm.getContent(), user);
    Board savedBoard = boardRepository.save(board);
    BoardInfo boardInfo = BoardInfo.generate(savedBoard);

    return new DataBox<>(DataBoxType.SUCCESS, "게시글이 저장되었습니다.", boardInfo);
  }

  /** 모든 게시글(Board) */
  public DataBox<List<BoardInfo>> list(Integer page) {
    PageRequest pageRequest = PageRequest.of(page, 20);
    Slice<Board> slice = boardRepository.findWithUserAll(pageRequest);
    List<BoardInfo> boardInfos = slice.map(BoardInfo::generate).toList();

    return new DataBox<>(DataBoxType.SUCCESS, slice.isLast(), boardInfos);
  }

  /** 단건 게시글(Board) */
  public DataBox<BoardInfo> info(Long boardId) {
    Board findBoard = boardRepository.findWithUserById(boardId).orElse(null);

    if (findBoard == null)
      return new DataBox<>(DataBoxType.FAILURE, "조회된 게시글이 없습니다.");

    List<CommentInfo> commentInfos = commentRepository.findWithUserByBoard(findBoard).stream()
        .map(CommentInfo::generate).toList();

    BoardInfo boardInfo = BoardInfo.generate(findBoard, commentInfos);
    return new DataBox<>(DataBoxType.SUCCESS, "조회 성공.", boardInfo);
  }

  /** 게시글(Board) 삭제 */
  @Transactional
  public DataBox<BoardInfo> delete(Long boardId, String userName) {
    Board findBoard = boardRepository.findById(boardId).orElse(null);

    if (findBoard == null)
      return new DataBox<>(DataBoxType.FAILURE, "존재하지 않는 게시글입니다.");
    if (!findBoard.getUser().getName().equals(userName))
      return new DataBox<>(DataBoxType.FAILURE, "게시글을 삭제할 권한이 없습니다.");

    boardRepository.delete(findBoard);
    BoardInfo boardInfo = BoardInfo.generate(findBoard);
    return new DataBox<>(DataBoxType.SUCCESS, "게시글이 삭제 되었습니다.", boardInfo);
  }

}

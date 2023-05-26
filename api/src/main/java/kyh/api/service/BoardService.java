package kyh.api.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.board.BoardInfo;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.entity.Board;
import kyh.api.domain.entity.User;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

  private final UserRepository userRepository;
  private final BoardRepository boardRepository;

  /** 게시글(Board) 작성 */
  @Transactional
  public DataBox<BoardInfo> write(String title, String content, Long userId) {
    User user = userRepository.findById(userId).orElseThrow();
    Board board = new Board(title, content, user);
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

    BoardInfo boardInfo = BoardInfo.generate(findBoard);
    return new DataBox<>(DataBoxType.SUCCESS, "조회 성공.", boardInfo);
  }

  /** 게시글(Board) 삭제 */
  @Transactional
  public DataBox<BoardInfo> delete(Long boardId, String username) {
    Board findBoard = boardRepository.findById(boardId).orElse(null);

    if (findBoard == null)
      return new DataBox<>(DataBoxType.FAILURE, "존재하지 않는 게시글입니다.");
    if (!findBoard.getUser().getName().equals(username))
      return new DataBox<>(DataBoxType.FAILURE, "게시글을 삭제할 권한이 없습니다.");

    boardRepository.delete(findBoard);
    BoardInfo boardInfo = BoardInfo.generate(findBoard);
    return new DataBox<>(DataBoxType.SUCCESS, "게시글이 삭제 되었습니다.", boardInfo);
  }

  /** 게시글(Board) 수정 */
  @Transactional
  public DataBox<BoardInfo> update(Long boardId, String title, String content, String username) {
    Board findBoard = boardRepository.findById(boardId).orElse(null);

    if (findBoard == null)
      return new DataBox<>(DataBoxType.FAILURE, "존재하지 않는 게시글입니다.");
    if (!findBoard.getUser().getName().equals(username))
      return new DataBox<>(DataBoxType.FAILURE, "게시글을 수정할 권한이 없습니다.");

    findBoard.changeBoard(title, content);
    Board savedBoard = boardRepository.save(findBoard);
    BoardInfo boardInfo = BoardInfo.generate(savedBoard);
    return new DataBox<>(DataBoxType.SUCCESS, "게시글이 수정 되었습니다.", boardInfo);
  }

}

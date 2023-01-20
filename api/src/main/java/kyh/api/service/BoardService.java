package kyh.api.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.Board;
import kyh.api.domain.BoardInfo;
import kyh.api.domain.BoardWriteForm;
import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.User;
import kyh.api.repository.BoardRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

  private final UserRepository userRepository;
  private final BoardRepository boardRepository;

  @Transactional
  public MessageBox<BoardInfo> write(BoardWriteForm boardWriteForm, Long UserId) {
    User user = userRepository.findById(UserId).orElseThrow();
    Board board = new Board(boardWriteForm.getTitle(), boardWriteForm.getContent(), user);
    Board savedBoard = boardRepository.save(board);
    BoardInfo boardInfo = new BoardInfo(savedBoard);

    return new MessageBox<>(MessageType.SUCCESS, "게시글이 저장되었습니다.", boardInfo);
  }

}

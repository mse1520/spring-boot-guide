package kyh.api.domain.dto.board;

import java.time.format.DateTimeFormatter;

import kyh.api.domain.entity.Board;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BoardInfo {

  private Long id;
  private String title;
  private String content;
  private String username;
  private String createdDate;

  public static BoardInfo generate(Board board) {
    BoardInfo boardInfo = new BoardInfo();
    boardInfo.id = board.getId();
    boardInfo.title = board.getTitle();
    boardInfo.content = board.getContent();
    boardInfo.username = board.getUser().getName();
    boardInfo.createdDate = board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    return boardInfo;
  }

}

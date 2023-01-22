package kyh.api.domain;

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

  private Long boardId;
  private String title;
  private String content;
  private String userName;
  private String createdDate;

  public static BoardInfo generate(Board board) {
    BoardInfo boardInfo = new BoardInfo();
    boardInfo.boardId = board.getId();
    boardInfo.title = board.getTitle();
    boardInfo.content = board.getContent();
    boardInfo.userName = board.getUser().getName();
    boardInfo.createdDate = board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    return boardInfo;
  }

}

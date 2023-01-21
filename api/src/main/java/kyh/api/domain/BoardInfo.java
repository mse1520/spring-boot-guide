package kyh.api.domain;

import java.time.format.DateTimeFormatter;

import kyh.api.domain.entity.Board;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BoardInfo {

  private String title;
  private String content;
  private String userName;
  private String createDateTime;

  public static BoardInfo generate(Board board) {
    BoardInfo boardInfo = new BoardInfo();
    boardInfo.title = board.getTitle();
    boardInfo.content = board.getContent();
    boardInfo.userName = board.getUser().getName();
    boardInfo.createDateTime = board.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    return boardInfo;
  }

}

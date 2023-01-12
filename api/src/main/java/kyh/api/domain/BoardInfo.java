package kyh.api.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BoardInfo {

  private String title;
  private String content;
  private String userName;
  private LocalDateTime creatDateTime;

  public BoardInfo(Board board) {
    title = board.getTitle();
    content = board.getContent();
    creatDateTime = board.getCreatedDate();
    userName = board.getUser().getName();
  }

}

package kyh.api.domain;

import java.time.LocalDateTime;

import kyh.api.domain.entity.Board;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BoardInfo {

  private String title;
  private String content;
  private String userName;
  private LocalDateTime createDateTime;

  public BoardInfo(Board board) {
    title = board.getTitle();
    content = board.getContent();
    createDateTime = board.getCreatedDate();
    userName = board.getUser().getName();
  }

}

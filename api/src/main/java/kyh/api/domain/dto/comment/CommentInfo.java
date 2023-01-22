package kyh.api.domain.dto.comment;

import java.time.LocalDateTime;

import kyh.api.domain.entity.Comment;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CommentInfo {

  private String content;
  private LocalDateTime createdDate;
  private LocalDateTime updatedDate;
  private String userName;

  public static CommentInfo generate(Comment comment) {
    CommentInfo commentInfo = new CommentInfo();
    commentInfo.content = comment.getContent();
    commentInfo.createdDate = comment.getCreatedDate();
    commentInfo.updatedDate = comment.getUpdatedDate();
    commentInfo.userName = comment.getUser().getName();
    return commentInfo;
  }

}

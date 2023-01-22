package kyh.api.domain.dto.comment;

import java.time.format.DateTimeFormatter;

import kyh.api.domain.entity.Comment;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentInfo {

  private Long commentId;
  private String content;
  private String createdDate;
  private String updatedDate;
  private String userName;

  public static CommentInfo generate(Comment comment) {
    CommentInfo commentInfo = new CommentInfo();
    commentInfo.commentId = comment.getId();
    commentInfo.content = comment.getContent();
    commentInfo.createdDate = comment.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    commentInfo.updatedDate = comment.getUpdatedDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    commentInfo.userName = comment.getUser().getName();
    return commentInfo;
  }

}

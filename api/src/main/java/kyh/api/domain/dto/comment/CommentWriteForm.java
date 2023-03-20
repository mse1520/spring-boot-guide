package kyh.api.domain.dto.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentWriteForm {

  @NotNull(message = "잘못된 게시글입니다.")
  private Long boardId;

  @NotEmpty(message = "댓글을 입력해주세요.")
  @Size(max = 1000, message = "댓글은 1000자를 넘을 수 없습니다.")
  private String content;

}

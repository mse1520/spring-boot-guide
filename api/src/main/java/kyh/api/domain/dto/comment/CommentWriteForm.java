package kyh.api.domain.dto.comment;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CommentWriteForm {

  @NotNull(message = "잘못된 게시글입니다.")
  private Long boardId;

  @NotEmpty(message = "내용을 입력해주세요.")
  @Size(max = 1000)
  private String content;

}

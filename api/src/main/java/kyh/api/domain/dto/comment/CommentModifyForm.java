package kyh.api.domain.dto.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentModifyForm {

  @NotEmpty(message = "내용을 입력해주세요.")
  @Size(max = 1000)
  private String content;

}

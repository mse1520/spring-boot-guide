package kyh.api.domain.dto.board;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BoardWriteForm {

  @NotEmpty(message = "제목은 필수 입력입니다.")
  private String title;

  @NotEmpty(message = "내용은 필수 입력입니다.")
  @Size(max = 5000)
  private String content;

}

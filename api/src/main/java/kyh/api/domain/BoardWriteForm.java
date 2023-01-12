package kyh.api.domain;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class BoardWriteForm {

  @NotEmpty(message = "제목은 필수 입력입니다.")
  private String title;

  @NotEmpty(message = "내용은 필수 입력입니다.")
  private String content;

}

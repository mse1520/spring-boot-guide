package kyh.api.domain.dto.board;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
  @Size(max = 5000, message = "내용은 5000자를 넘을 수 없습니다.")
  private String content;

}

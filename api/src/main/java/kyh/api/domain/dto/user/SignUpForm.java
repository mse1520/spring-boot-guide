package kyh.api.domain.dto.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SignUpForm {

  @NotEmpty(message = "아이디를 입력해야 합니다.")
  private String username;

  @NotEmpty(message = "비밀번호를 입력해야 합니다.")
  private String password;

}

package kyh.api.domain.dto.user;

import javax.validation.constraints.NotEmpty;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SignUpUserForm {

  @NotEmpty(message = "아이디를 입력해야 합니다.")
  private String name;

  @NotEmpty(message = "비밀번호를 입력해야 합니다.")
  private String password;

}

package kyh.api.domain.dto.user;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SignUserForm {

  @NotEmpty(message = "아이디를 입력해야 합니다.")
  private String name;

  @NotEmpty(message = "비밀번호를 입력해야 합니다.")
  private String password;

}

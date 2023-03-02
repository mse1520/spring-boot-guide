package kyh.api.domain.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class UserDetailInfo {

  private Long id;
  private String name;
  private String password;
  private UserRole role;

  public UserDetailInfo(User user) {
    id = user.getId();
    name = user.getName();
    password = user.getPassword();
    role = user.getAuthority().getRole();
  }

  @JsonIgnore
  public String getPassword() {
    return password;
  }

}

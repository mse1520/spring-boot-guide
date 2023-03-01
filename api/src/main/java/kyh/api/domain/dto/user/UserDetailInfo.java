package kyh.api.domain.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserDetailInfo {

  private Long id;
  private String name;
  private UserRole role;
  private String password;

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

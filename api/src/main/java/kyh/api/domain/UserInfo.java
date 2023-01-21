package kyh.api.domain;

import kyh.api.domain.entity.User;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserInfo {

  private Long id;
  private String name;
  private UserRole userRole;

  public UserInfo(User user) {
    id = user.getId();
    name = user.getName();
    userRole = user.getUserRole();
  }

}

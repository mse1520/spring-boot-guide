package kyh.api.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserInfo {

  private Long id;
  private String name;

  public UserInfo(User user) {
    id = user.getId();
    name = user.getName();
  }

}

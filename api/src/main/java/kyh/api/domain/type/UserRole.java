package kyh.api.domain.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {
  SUPERL("SUPERL"),
  ADMIN("ADMIN"),
  USER("USER");

  private String role;
}

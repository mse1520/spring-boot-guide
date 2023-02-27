package kyh.api.domain.type;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberRole {
  SUPER("SUPER"),
  ADMIN("ADMIN"),
  USER("USER");

  private String value;
}

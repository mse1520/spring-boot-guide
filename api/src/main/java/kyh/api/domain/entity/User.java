package kyh.api.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import kyh.api.domain.UserRole;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

  @Id
  @GeneratedValue
  @Column(name = "user_id")
  private Long id;

  @Column(unique = true, nullable = false)
  private String name;

  private String password;

  @Enumerated(EnumType.STRING)
  private UserRole userRole;

  public User(String name, String password, UserRole userRole) {
    this.name = name;
    this.password = password;
    this.userRole = userRole;
  }

}
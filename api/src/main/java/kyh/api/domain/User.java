package kyh.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Entity(name = "users")
public class User extends BaseEntity {

  @Id
  @GeneratedValue
  @Column(name = "user_id")
  private Long id;

  @Column(unique = true)
  private String name;

  private String password;

  public User(String name, String password) {
    this.name = name;
    this.password = password;
  }

}
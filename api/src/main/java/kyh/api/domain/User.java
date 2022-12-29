package kyh.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "users")
public class User extends BaseEntity {

  @Id
  @GeneratedValue
  @Column(name = "user_id")
  private Long id;

  @Column(unique = true)
  private String name;

  private String password;

}
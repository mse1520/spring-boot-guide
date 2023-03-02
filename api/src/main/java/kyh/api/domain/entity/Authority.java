package kyh.api.domain.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import kyh.api.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Authority extends BaseEntity {

  @Id
  @GeneratedValue
  @Column(name = "authority_id")
  private Long id;

  @Column(nullable = false, unique = true)
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @OneToMany(mappedBy = "authority")
  private List<AuthorityMenu> authorityMenus = new ArrayList<>();

  public Authority(UserRole role) {
    this.role = role;
  }

}
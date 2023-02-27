package kyh.api.domain.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import kyh.api.domain.type.MemberRole;
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
  private MemberRole role;

  @OneToMany(mappedBy = "authority")
  private List<AuthorityMenu> authorityMenus = new ArrayList<>();

  public Authority(MemberRole role) {
    this.role = role;
  }

}
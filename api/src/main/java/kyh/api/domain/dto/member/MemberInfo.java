package kyh.api.domain.dto.member;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.Member;
import kyh.api.domain.type.MemberRole;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberInfo implements UserDetails {

  private MemberInfoDetail member;
  private List<MenuInfo> menuList;

  public static MemberInfo generate(Member member) {
    MemberInfo memberInfo = new MemberInfo();
    memberInfo.member = new MemberInfoDetail(member);
    memberInfo.menuList = MenuInfo.generate(member.getAuthority());
    return memberInfo;
  }

  public static MemberInfo generate(Authority authority) {
    MemberInfo memberInfo = new MemberInfo();
    memberInfo.menuList = MenuInfo.generate(authority);
    return memberInfo;
  }

  @JsonIgnore
  public Long getId() {
    return member.getId();
  }

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.unmodifiableList(AuthorityUtils.createAuthorityList(member.getRole().getValue()));
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return member.getPassword();
  }

  @JsonIgnore
  @Override
  public String getUsername() {
    return member.getUsername();
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return true;
  }

  @Getter
  @ToString
  private static class MemberInfoDetail {

    private Long id;
    private String username;
    private MemberRole role;
    private String password;

    private MemberInfoDetail(Member member) {
      id = member.getId();
      username = member.getUsername();
      password = member.getPassword();
      role = member.getAuthority().getRole();
    }

    @JsonIgnore
    private String getPassword() {
      return password;
    }

  }

}

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

  public static MemberInfo create(Member member) {
    MemberInfo userInfo = new MemberInfo();
    userInfo.member = new MemberInfoDetail(member);
    userInfo.menuList = MenuInfo.create(member.getAuthority());
    return userInfo;
  }

  public static MemberInfo create(Authority authority) {
    MemberInfo userInfo = new MemberInfo();
    userInfo.menuList = MenuInfo.create(authority);
    return userInfo;
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

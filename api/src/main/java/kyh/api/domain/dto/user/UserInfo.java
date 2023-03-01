package kyh.api.domain.dto.user;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserInfo implements UserDetails {

  private UserDetailInfo user;
  private List<MenuInfo> menuList;

  public static UserInfo generate(User user) {
    UserInfo userInfo = new UserInfo();
    userInfo.user = new UserDetailInfo(user);
    userInfo.menuList = MenuInfo.generate(user.getAuthority());
    return userInfo;
  }

  public static UserInfo generate(Authority authority) {
    UserInfo userInfo = new UserInfo();
    userInfo.menuList = MenuInfo.generate(authority);
    return userInfo;
  }

  @JsonIgnore
  public Long getId() {
    return user.getId();
  }

  @JsonIgnore
  public String getName() {
    return user.getName();
  }

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.unmodifiableList(AuthorityUtils.createAuthorityList(user.getRole().getValue()));
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @JsonIgnore
  @Override
  public String getUsername() {
    return user.getName();
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

}

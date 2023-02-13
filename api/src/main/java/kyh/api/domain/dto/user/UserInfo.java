package kyh.api.domain.dto.user;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserInfo implements UserDetails {

  private Long id;
  private String name;
  private String password;
  private UserRole userRole;

  public UserInfo(User user) {
    id = user.getId();
    name = user.getName();
    password = user.getPassword();
    userRole = user.getUserRole();
  }

  @JsonIgnore
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.unmodifiableList(AuthorityUtils.createAuthorityList(userRole.getRole()));
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return password;
  }

  @JsonIgnore
  @Override
  public String getUsername() {
    return name;
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

package kyh.api.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.SignUpUserForm;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.AuthorityRepository;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final AuthorityRepository authorityRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  /** 회원 가입 */
  @Transactional
  public DataBox<UserInfo> signUp(SignUpUserForm form) {
    if (userRepository.findByName(form.getName()).orElse(null) != null)
      return new DataBox<>(DataBoxType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    Authority auth = authorityRepository.findByRole(UserRole.USER).orElseThrow();
    User user = new User(form.getName(), passwordEncoder.encode(form.getPassword()), auth);
    User savedUser = userRepository.save(user);
    UserInfo userInfo = new UserInfo(savedUser);

    return new DataBox<>(DataBoxType.SUCCESS, "회원가입에 성공하였습니다.", userInfo);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findWithMenuByName(username)
        .orElseThrow(() -> new UsernameNotFoundException("아이디를 찾을 수 없습니다."));
    return new UserInfo(user);
  }

}

package kyh.api.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.SignUserForm;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

  private final String SESSION_KEY = "USER";

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  /** 회원 정보 */
  public UserInfo info(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    return session != null ? (UserInfo) session.getAttribute(SESSION_KEY) : null;
  }

  /** 회원 가입 */
  @Transactional
  public DataBox<UserInfo> signUp(SignUserForm form) {
    if (userRepository.findByName(form.getName()).orElse(null) != null)
      return new DataBox<>(DataBoxType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    User user = new User(form.getName(), passwordEncoder.encode(form.getPassword()), UserRole.USER);
    User savedUser = userRepository.save(user);
    UserInfo userInfo = new UserInfo(savedUser);

    return new DataBox<>(DataBoxType.SUCCESS, "회원가입에 성공하였습니다.", userInfo);
  }

  /** 회원 인증 */
  public DataBox<UserInfo> signIn(SignUserForm form, HttpServletRequest request) {
    User findUser = userRepository.findByName(form.getName()).orElse(null);

    if (findUser == null)
      return new DataBox<>(DataBoxType.FAILURE, "아이디를 찾을 수 없습니다.");
    if (!passwordEncoder.matches(form.getPassword(), findUser.getPassword()))
      return new DataBox<>(DataBoxType.FAILURE, "회원 인증에 실패하였습니다.");

    UserInfo userInfo = new UserInfo(findUser);
    request.getSession().setAttribute(SESSION_KEY, userInfo);
    return new DataBox<>(DataBoxType.SUCCESS, "회원 인증에 성공했습니다.", userInfo);

  }

  /** 로그아웃 */
  public DataBox<Object> signOut(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    if (session != null)
      session.invalidate();

    return new DataBox<>(DataBoxType.SUCCESS, "로그아웃 성공.");
  }

}

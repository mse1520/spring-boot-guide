package kyh.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.SignUser;
import kyh.api.domain.User;
import kyh.api.domain.UserInfo;
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
  public MessageBox<UserInfo> signUp(SignUser signUser) {
    if (userRepository.findByName(signUser.getName()).size() > 0)
      return new MessageBox<>(MessageType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    User user = new User(signUser.getName(), passwordEncoder.encode(signUser.getPassword()));
    User savedUser = userRepository.save(user);
    UserInfo userInfo = new UserInfo(savedUser.getId(), savedUser.getName());

    return new MessageBox<>(MessageType.SUCCESS, "회원가입에 성공하였습니다.", userInfo);
  }

  /** 회원 인증 */
  public MessageBox<UserInfo> signIn(SignUser signUser, HttpServletRequest request) {
    List<User> findUsers = userRepository.findByName(signUser.getName());

    for (User findUser : findUsers) {
      if (!passwordEncoder.matches(signUser.getPassword(), findUser.getPassword()))
        return new MessageBox<>(MessageType.FAILURE, "회원 인증에 실패하였습니다.");

      UserInfo userInfo = new UserInfo(findUser.getId(), findUser.getName());
      request.getSession().setAttribute(SESSION_KEY, userInfo);
      return new MessageBox<>(MessageType.SUCCESS, "회원 인증에 성공했습니다.", userInfo);
    }

    return new MessageBox<>(MessageType.FAILURE, "아이디를 찾을 수 없습니다.");
  }

  /** 로그아웃 */
  public MessageBox<Object> signOut(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    if (session != null)
      session.invalidate();

    return new MessageBox<>(MessageType.SUCCESS, "로그아웃 성공.");
  }

}

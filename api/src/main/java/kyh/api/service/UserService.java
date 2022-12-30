package kyh.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.User;
import kyh.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final String SESSION_KEY = "USER";

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  /** 회원 정보 */
  public User info(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    return session != null ? (User) session.getAttribute(SESSION_KEY) : null;
  }

  /** 회원 가입 */
  public MessageBox<User> signUp(User user) {
    MessageBox<User> checkUser = parameterValidation(user);
    if (checkUser.getType() == MessageType.FAILURE)
      return checkUser;

    if (userRepository.findByName(user.getName()).size() > 0)
      return new MessageBox<User>(MessageType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    user.setPassword(passwordEncoder.encode(user.getPassword()));
    User saveUser = userRepository.save(user);

    saveUser.setPassword(null);
    return new MessageBox<User>(MessageType.SUCCESS, "회원가입에 성공하였습니다.", saveUser);
  }

  /** 회원 인증 */
  public MessageBox<User> signIn(User user, HttpServletRequest request) {
    MessageBox<User> checkUser = parameterValidation(user);
    if (checkUser.getType() == MessageType.FAILURE)
      return checkUser;

    List<User> findUsers = userRepository.findByName(user.getName());

    for (User findUser : findUsers) {
      if (!passwordEncoder.matches(user.getPassword(), findUser.getPassword()))
        return new MessageBox<User>(MessageType.FAILURE, "회원 인증에 실패하였습니다.");

      findUser.setPassword(null);
      request.getSession().setAttribute(SESSION_KEY, findUser);
      return new MessageBox<User>(MessageType.SUCCESS, "회원 인증에 성공했습니다.", findUser);
    }

    return new MessageBox<User>(MessageType.FAILURE, "아이디를 찾을 수 없습니다.");
  }

  /** 로그아웃 */
  public MessageBox<Object> signOut(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    if (session != null)
      session.invalidate();

    return new MessageBox<Object>(MessageType.SUCCESS, "로그아웃 성공.");
  }

  /** 입력 파라미터 유효성 검사 */
  private MessageBox<User> parameterValidation(User user) {
    if (user.getName().equals(""))
      return new MessageBox<User>(MessageType.FAILURE, "아이디를 입력해야 합니다.");
    if (user.getPassword().equals(""))
      return new MessageBox<User>(MessageType.FAILURE, "비밀번호를 입력해야 합니다.");

    return new MessageBox<User>(MessageType.SUCCESS);
  }

}

package kyh.api.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.SignDto;
import kyh.api.domain.User;
import kyh.api.domain.UserDto;
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
  public UserDto info(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    return session != null ? (UserDto) session.getAttribute(SESSION_KEY) : null;
  }

  /** 회원 가입 */
  @Transactional
  public MessageBox<UserDto> signUp(SignDto signDto) {
    if (userRepository.findByName(signDto.getName()).size() > 0)
      return new MessageBox<>(MessageType.FAILURE, "이미 존재하는 회원입니다.\n다른 아이디를 사용해주세요.");

    User user = new User(signDto.getName(), passwordEncoder.encode(signDto.getPassword()));
    User savedUser = userRepository.save(user);
    UserDto userDto = new UserDto(savedUser.getId(), savedUser.getName());

    return new MessageBox<>(MessageType.SUCCESS, "회원가입에 성공하였습니다.", userDto);
  }

  /** 회원 인증 */
  public MessageBox<UserDto> signIn(SignDto signDto, HttpServletRequest request) {
    List<User> findUsers = userRepository.findByName(signDto.getName());

    for (User findUser : findUsers) {
      if (!passwordEncoder.matches(signDto.getPassword(), findUser.getPassword()))
        return new MessageBox<>(MessageType.FAILURE, "회원 인증에 실패하였습니다.");

      UserDto userDto = new UserDto(findUser.getId(), findUser.getName());
      request.getSession().setAttribute(SESSION_KEY, userDto);
      return new MessageBox<>(MessageType.SUCCESS, "회원 인증에 성공했습니다.", userDto);
    }

    return new MessageBox<>(MessageType.FAILURE, "아이디를 찾을 수 없습니다.");
  }

  /** 로그아웃 */
  public MessageBox<Object> signOut(HttpServletRequest request) {
    HttpSession session = request.getSession(false);

    if (session != null)
      session.invalidate();

    return new MessageBox<Object>(MessageType.SUCCESS, "로그아웃 성공.");
  }

}

package kyh.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.User;
import kyh.api.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
public class UserController {

  private final UserService userService;

  /** 회원 정보 */
  @GetMapping(value = "/info")
  public User userInfo(HttpServletRequest request) {
    return userService.info(request);
  }

  /** 회원 가입 */
  @PostMapping(value = "/sign-up")
  public ResponseEntity<MessageBox<User>> SignUp(@RequestBody User user) {
    MessageBox<User> result = userService.signUp(user);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok().body(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 회원 인증 */
  @PostMapping(value = "/sign-in")
  public ResponseEntity<MessageBox<User>> signIn(@RequestBody User user, HttpServletRequest request) {
    MessageBox<User> result = userService.signIn(user, request);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok().body(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 로그아웃 */
  @DeleteMapping(value = "/sign-out")
  public MessageBox<Object> signOut(HttpServletRequest request) {
    return userService.signOut(request);
  }

}
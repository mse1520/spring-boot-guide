package kyh.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.SignDto;
import kyh.api.domain.UserDto;
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
  public UserDto userInfo(HttpServletRequest request) {
    return userService.info(request);
  }

  /** 회원 가입 */
  @PostMapping(value = "/sign-up")
  public ResponseEntity<MessageBox<UserDto>> SignUp(@RequestBody @Validated SignDto signDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.createFailedMessage(bindingResult));

    MessageBox<UserDto> result = userService.signUp(signDto);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok().body(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 회원 인증 */
  @PostMapping(value = "/sign-in")
  public ResponseEntity<MessageBox<UserDto>> signIn(HttpServletRequest request, @RequestBody @Validated SignDto signDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.createFailedMessage(bindingResult));

    MessageBox<UserDto> result = userService.signIn(signDto, request);

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
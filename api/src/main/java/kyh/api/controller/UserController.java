package kyh.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.common.MessageBox;
import kyh.api.domain.dto.common.MessageType;
import kyh.api.domain.dto.user.SignUserForm;
import kyh.api.domain.dto.user.UserInfo;
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

  /** 회원 정보 api */
  @GetMapping(value = "/info")
  public UserInfo userInfo(HttpServletRequest request) {
    return userService.info(request);
  }

  /** 회원 가입 api */
  @PostMapping(value = "/sign-up")
  public ResponseEntity<MessageBox<UserInfo>> SignUp(@RequestBody @Validated SignUserForm form,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.failed(bindingResult));

    MessageBox<UserInfo> result = userService.signUp(form);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 회원 인증 api */
  @PostMapping(value = "/sign-in")
  public ResponseEntity<MessageBox<UserInfo>> signIn(HttpServletRequest request,
      @RequestBody @Validated SignUserForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.failed(bindingResult));

    MessageBox<UserInfo> result = userService.signIn(form, request);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 로그아웃 api */
  @DeleteMapping(value = "/sign-out")
  public MessageBox<Object> signOut(HttpServletRequest request) {
    return userService.signOut(request);
  }

}
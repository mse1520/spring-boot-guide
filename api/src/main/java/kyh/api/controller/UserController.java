package kyh.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
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
  public ResponseEntity<DataBox<UserInfo>> SignUp(@RequestBody @Validated SignUserForm form,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<UserInfo> result = userService.signUp(form);

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 회원 인증 api */
  @PostMapping(value = "/sign-in")
  public ResponseEntity<DataBox<UserInfo>> signIn(HttpServletRequest request,
      @RequestBody @Validated SignUserForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<UserInfo> result = userService.signIn(form, request);

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
  }

  /** 로그아웃 api */
  @DeleteMapping(value = "/sign-out")
  public DataBox<Object> signOut(HttpServletRequest request) {
    return userService.signOut(request);
  }

}
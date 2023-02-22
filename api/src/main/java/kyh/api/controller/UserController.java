package kyh.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
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
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
public class UserController {

  private final UserService userService;

  /** 회원 정보 api */
  @GetMapping(value = "/info")
  public UserInfo info(@AuthenticationPrincipal UserInfo userInfo) {
    return userInfo;
  }

  /** 인증 성공 api */
  @GetMapping(value = "/sign-in")
  public DataBox<UserInfo> signIn(@AuthenticationPrincipal UserInfo userInfo) {
    return new DataBox<>(DataBoxType.SUCCESS, "회원 인증에 성공했습니다.", userInfo);
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

  /** 인증 실패 api */
  @RequestMapping(value = "/error")
  public ResponseEntity<DataBox<String>> error(@RequestParam String message) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new DataBox<>(DataBoxType.FAILURE, message));
  }

}
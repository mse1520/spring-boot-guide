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
import kyh.api.domain.dto.member.MemberInfo;
import kyh.api.domain.dto.member.SignUpUserForm;
import kyh.api.service.MemberService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/member")
public class MemberController {

  private final MemberService userService;

  /** 회원 정보 api */
  @GetMapping(value = "/info")
  public MemberInfo info(@AuthenticationPrincipal MemberInfo userInfo) {
    return userService.info(userInfo);
  }

  /** 인증 성공 api */
  @GetMapping(value = "/sign-in")
  public DataBox<MemberInfo> signIn(@AuthenticationPrincipal MemberInfo userInfo) {
    return new DataBox<>(DataBoxType.SUCCESS, "회원 인증에 성공했습니다.", userInfo);
  }

  /** 회원 가입 api */
  @PostMapping(value = "/sign-up")
  public ResponseEntity<DataBox<MemberInfo>> SignUp(@RequestBody @Validated SignUpUserForm form,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<MemberInfo> result = userService.signUp(form);

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
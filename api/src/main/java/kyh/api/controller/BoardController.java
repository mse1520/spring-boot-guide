package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.BoardInfo;
import kyh.api.domain.BoardWriteForm;
import kyh.api.domain.MessageBox;
import kyh.api.domain.MessageType;
import kyh.api.domain.UserInfo;
import kyh.api.service.BoardService;
import kyh.api.service.UserService;
import lombok.RequiredArgsConstructor;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value = "/board")
@RequiredArgsConstructor
public class BoardController {

  private final UserService userService;
  private final BoardService boardService;

  @PostMapping(value = "/write")
  public ResponseEntity<MessageBox<BoardInfo>> write(HttpServletRequest request,
      @RequestBody @Validated BoardWriteForm boardWriteForm, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.failed(bindingResult));

    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(MessageBox.unauthorized());

    MessageBox<BoardInfo> result = boardService.write(boardWriteForm, userInfo.getId());

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
  }

}

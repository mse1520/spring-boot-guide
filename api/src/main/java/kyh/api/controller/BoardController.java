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

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping(value = "/board")
@RequiredArgsConstructor
public class BoardController {

  private final UserService userService;
  private final BoardService boardService;

  /** 게시글 작성 api */
  @PostMapping(value = "/write")
  public ResponseEntity<MessageBox<BoardInfo>> write(HttpServletRequest request,
      @RequestBody @Validated BoardWriteForm boardWriteForm, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageBox.failed(bindingResult));

    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(MessageBox.unauthorized());

    return ResponseEntity.ok(boardService.write(boardWriteForm, userInfo.getId()));
  }

  /** 게시글 조회 api */
  @GetMapping(value = "/list")
  public List<BoardInfo> list() {
    return boardService.list();
  }

  /** 게시글 단건 조회 api */
  @GetMapping(value = "/info/{boardId}")
  public ResponseEntity<MessageBox<BoardInfo>> info(@PathVariable Long boardId) {
    MessageBox<BoardInfo> result = boardService.info(boardId);

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 게시글 삭제 api */
  @DeleteMapping(value = "/info/{boardId}")
  public ResponseEntity<MessageBox<BoardInfo>> delete(@PathVariable Long boardId, HttpServletRequest request) {
    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(MessageBox.unauthorized());

    MessageBox<BoardInfo> result = boardService.delete(boardId, userInfo.getName());

    return result.getType() == MessageType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

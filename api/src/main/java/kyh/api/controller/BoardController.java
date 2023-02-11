package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.board.BoardInfo;
import kyh.api.domain.dto.board.BoardWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.UserInfo;
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
import org.springframework.web.bind.annotation.RequestParam;
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
  public ResponseEntity<DataBox<BoardInfo>> write(HttpServletRequest request,
      @RequestBody @Validated BoardWriteForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataBox.unauthorized());

    return ResponseEntity.ok(boardService.write(form, userInfo.getId()));
  }

  /** 게시글 조회 api */
  @GetMapping(value = "/list")
  public DataBox<List<BoardInfo>> list(@RequestParam Integer page) {
    return boardService.list(page);
  }

  /** 게시글 단건 조회 api */
  @GetMapping(value = "/info/{boardId}")
  public ResponseEntity<DataBox<BoardInfo>> info(@PathVariable Long boardId) {
    DataBox<BoardInfo> result = boardService.info(boardId);

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 게시글 삭제 api */
  @DeleteMapping(value = "/info/{boardId}")
  public ResponseEntity<DataBox<BoardInfo>> delete(@PathVariable Long boardId, HttpServletRequest request) {
    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataBox.unauthorized());

    DataBox<BoardInfo> result = boardService.delete(boardId, userInfo.getName());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

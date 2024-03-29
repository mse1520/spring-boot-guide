package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.board.BoardInfo;
import kyh.api.domain.dto.board.BoardWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.service.BoardService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

  private final BoardService boardService;

  /** 게시글 작성 api */
  @PostMapping(value = "/write")
  public ResponseEntity<DataBox<BoardInfo>> write(@RequestBody @Validated BoardWriteForm form,
      BindingResult bindingResult, @AuthenticationPrincipal UserInfo userInfo) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    return ResponseEntity.ok(boardService.write(form.getTitle(), form.getContent(), userInfo.getId()));
  }

  /** 게시글 조회 api */
  @GetMapping(value = "/info")
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
  public ResponseEntity<DataBox<BoardInfo>> delete(@PathVariable Long boardId,
      @AuthenticationPrincipal UserInfo userInfo) {
    DataBox<BoardInfo> result = boardService.delete(boardId, userInfo.getName());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 게시글 수정 api */
  @PutMapping(value = "/info/{boardId}/update")
  public ResponseEntity<DataBox<BoardInfo>> update(@PathVariable Long boardId, @RequestBody BoardWriteForm form,
      BindingResult bindingResult, @AuthenticationPrincipal UserInfo userInfo) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<BoardInfo> result = boardService.update(boardId, form.getTitle(), form.getContent(),
        userInfo.getUsername());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

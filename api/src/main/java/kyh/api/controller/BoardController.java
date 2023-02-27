package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.board.BoardInfo;
import kyh.api.domain.dto.board.BoardWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.member.MemberInfo;
import kyh.api.service.BoardService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

  private final BoardService boardService;

  /** 게시글 작성 api */
  @PostMapping(value = "/write")
  public ResponseEntity<DataBox<BoardInfo>> write(@RequestBody @Validated BoardWriteForm form,
      BindingResult bindingResult, @AuthenticationPrincipal MemberInfo memberInfo) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    return ResponseEntity.ok(boardService.write(form, memberInfo.getId()));
  }

  /** 게시글 조회 api */
  @GetMapping(value = "/list")
  public DataBox<List<BoardInfo>> list(@RequestParam Integer page) {
    return boardService.list(page);
  }

  /** 게시글 단건 조회 api */
  @GetMapping(value = "/{boardId}/info")
  public ResponseEntity<DataBox<BoardInfo>> info(@PathVariable Long boardId) {
    DataBox<BoardInfo> result = boardService.info(boardId);

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 게시글 삭제 api */
  @DeleteMapping(value = "/{boardId}/info")
  public ResponseEntity<DataBox<BoardInfo>> delete(@PathVariable Long boardId,
      @AuthenticationPrincipal MemberInfo memberInfo) {
    DataBox<BoardInfo> result = boardService.delete(boardId, memberInfo.getUsername());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

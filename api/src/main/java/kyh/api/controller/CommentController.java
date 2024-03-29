package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.comment.CommentInfo;
import kyh.api.domain.dto.comment.CommentListForm;
import kyh.api.domain.dto.comment.CommentUpdateForm;
import kyh.api.domain.dto.comment.CommentWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.service.CommentService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping(value = "/comment")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  /** 댓글 작성 api */
  @PostMapping(value = "/write")
  public ResponseEntity<DataBox<CommentInfo>> write(@RequestBody @Validated CommentWriteForm form,
      BindingResult bindingResult, @AuthenticationPrincipal UserInfo userInfo) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<CommentInfo> result = commentService.wirte(form, userInfo.getId());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 리스트 api */
  @GetMapping(value = "/info")
  public ResponseEntity<DataBox<List<CommentInfo>>> list(@Validated CommentListForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<List<CommentInfo>> result = commentService.list(form.getBoardId(), form.getPage());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 삭제 api */
  @DeleteMapping(value = "/info/{commentId}")
  public ResponseEntity<DataBox<CommentInfo>> delete(@PathVariable Long commentId,
      @AuthenticationPrincipal UserInfo userInfo) {
    DataBox<CommentInfo> result = commentService.delete(commentId, userInfo.getId());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 수정 api */
  @PutMapping(value = "/info/{commentId}")
  public ResponseEntity<DataBox<CommentInfo>> update(@PathVariable Long commentId,
      @RequestBody @Validated CommentUpdateForm form, BindingResult bindingResult,
      @AuthenticationPrincipal UserInfo userInfo) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    DataBox<CommentInfo> result = commentService.update(commentId, userInfo.getId(), form.getContent());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

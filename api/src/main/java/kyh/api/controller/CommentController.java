package kyh.api.controller;

import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.comment.CommentInfo;
import kyh.api.domain.dto.comment.CommentModifyForm;
import kyh.api.domain.dto.comment.CommentWriteForm;
import kyh.api.domain.dto.common.DataBox;
import kyh.api.domain.dto.common.DataBoxType;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.service.CommentService;
import kyh.api.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(value = "/comment")
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;
  private final UserService userService;

  /** 댓글 작성 api */
  @PostMapping(value = "/write")
  public ResponseEntity<DataBox<CommentInfo>> write(HttpServletRequest request,
      @RequestBody @Validated CommentWriteForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataBox.unauthorized());

    DataBox<CommentInfo> result = commentService.wirte(form, userInfo.getId());

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 리스트 api */
  @GetMapping(value = "/list/{boardId}")
  public ResponseEntity<DataBox<List<CommentInfo>>> list(HttpServletRequest request, @PathVariable Long boardId,
      @RequestParam Integer page) {
    DataBox<List<CommentInfo>> result = commentService.list(boardId, page);

    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 삭제 api */
  @DeleteMapping(value = "/info/{commentId}")
  public ResponseEntity<DataBox<CommentInfo>> delete(HttpServletRequest request, @PathVariable Long commentId) {
    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataBox.unauthorized());

    DataBox<CommentInfo> result = commentService.delete(commentId, userInfo.getId());
    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

  /** 댓글 수정 api */
  @PutMapping(value = "/info/{commentId}")
  public ResponseEntity<DataBox<CommentInfo>> modify(HttpServletRequest request, @PathVariable Long commentId,
      @RequestBody @Validated CommentModifyForm form, BindingResult bindingResult) {
    if (bindingResult.hasErrors())
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DataBox.failed(bindingResult));

    UserInfo userInfo = userService.info(request);
    if (userInfo == null)
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(DataBox.unauthorized());

    DataBox<CommentInfo> result = commentService.modify(commentId, userInfo.getId(), form.getContent());
    return result.getType() == DataBoxType.SUCCESS
        ? ResponseEntity.ok(result)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}

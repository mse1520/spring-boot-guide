package kyh.api.domain;

import org.springframework.validation.BindingResult;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageBox<T> {

  private MessageType type;
  private String message;
  private T body;

  public MessageBox(MessageType type) {
    this.type = type;
  }

  public MessageBox(MessageType type, String message) {
    this.type = type;
    this.message = message;
  }

  /** 실패 메시지를 생성합니다 */
  public static <T> MessageBox<T> failed(BindingResult bindingResult) {
    String message = bindingResult.getAllErrors().stream()
        .map(err -> err.getDefaultMessage())
        .findFirst()
        .orElseThrow();

    return new MessageBox<>(MessageType.FAILURE, message);
  }

  /** 인증되지 않은 사용자에 대한 메세지 */
  public static <T> MessageBox<T> unauthorized() {
    return new MessageBox<>(MessageType.FAILURE, "인증되지 않은 사용자.");
  }

}

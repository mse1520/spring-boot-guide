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

  public static <T> MessageBox<T> createFailedMessage(BindingResult bindingResult) {
    String message = bindingResult.getAllErrors().stream()
        .map(err -> err.getDefaultMessage())
        .findFirst()
        .orElseThrow();

    return new MessageBox<>(MessageType.FAILURE, message);
  }

}

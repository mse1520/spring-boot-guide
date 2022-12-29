package kyh.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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

}

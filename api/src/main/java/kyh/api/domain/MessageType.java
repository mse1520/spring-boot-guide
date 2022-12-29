package kyh.api.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MessageType {
  SUCCESS("SUCCESS"),
  FAILURE("FAILURE");

  private String type;
}

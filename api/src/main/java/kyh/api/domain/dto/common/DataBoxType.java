package kyh.api.domain.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DataBoxType {
  SUCCESS("SUCCESS"),
  FAILURE("FAILURE");

  private String type;
}

package kyh.api.domain.dto.common;

import org.springframework.validation.BindingResult;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class DataBox<T> {

  private DataBoxType type;
  private String message;
  private Boolean isLast;
  private Long total;
  private T body;

  public DataBox(DataBoxType type) {
    this.type = type;
  }

  public DataBox(DataBoxType type, String message) {
    this.type = type;
    this.message = message;
  }

  public DataBox(DataBoxType type, T body) {
    this.type = type;
    this.body = body;
  }

  public DataBox(DataBoxType type, String message, T body) {
    this.type = type;
    this.message = message;
    this.body = body;
  }

  public DataBox(DataBoxType type, Boolean isLast, T body) {
    this.type = type;
    this.isLast = isLast;
    this.body = body;
  }

  public DataBox(DataBoxType type, Boolean isLast, Long total, T body) {
    this.type = type;
    this.isLast = isLast;
    this.total = total;
    this.body = body;
  }

  /** 실패 메시지를 생성합니다 */
  public static <T> DataBox<T> failed(BindingResult bindingResult) {
    String message = bindingResult.getAllErrors().stream()
        .map(err -> err.getDefaultMessage())
        .findFirst()
        .orElseThrow();

    return new DataBox<>(DataBoxType.FAILURE, message);
  }

}

package kyh.api;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class PrintTest {

  @Test
  @DisplayName("sysout으로 테스트코드를 실행했을때의 결과를 확인해봅니다")
  public void print() {
    System.out.println("테스트 메세지");
  }

}

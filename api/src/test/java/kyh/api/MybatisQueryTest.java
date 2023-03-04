package kyh.api;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.dao.UserDao;
import kyh.api.domain.dto.user.UserInfo;

@SpringBootTest
@Transactional
public class MybatisQueryTest {

  private final String USER_NAME = "123";

  @Autowired
  private UserDao userDao;

  @Test
  @DisplayName("mybatis xml을 이용한 쿼리작성 테스트")
  public void nativeQueryTest() {
    UserInfo userInfo = userDao.findWithMenuByName(USER_NAME).orElseThrow();

    System.out.println(userInfo);

    Assertions.assertThat(userInfo.getName()).isEqualTo(USER_NAME);
  }

}

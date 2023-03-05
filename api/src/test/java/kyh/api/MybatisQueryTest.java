package kyh.api;

import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.dao.AuthorityDao;
import kyh.api.dao.UserDao;
import kyh.api.dao.UserQueryDao;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;

@SpringBootTest
@Transactional
public class MybatisQueryTest {

  private final String USER_NAME = "test";

  @Autowired
  private UserDao userDao;
  @Autowired
  private UserQueryDao userQueryDao;
  @Autowired
  private AuthorityDao authorityDao;

  @BeforeEach
  public void nativeQueryTransactionTest() {
    Optional<User> findUser = userDao.findByName(USER_NAME);

    if (findUser.isPresent())
      return;

    Authority auth = authorityDao.findByRole(UserRole.SUPER).orElseThrow();
    User user = new User(USER_NAME, "password", auth);

    userDao.save(user);
  }

  @Test
  @DisplayName("mybatis xml을 이용한 쿼리작성 테스트")
  public void nativeQueryTest() {
    UserInfo userInfo = userQueryDao.findWithMenuByName(USER_NAME).orElseThrow();

    System.out.println(userInfo);

    Assertions.assertThat(userInfo.getName()).isEqualTo(USER_NAME);
  }

}

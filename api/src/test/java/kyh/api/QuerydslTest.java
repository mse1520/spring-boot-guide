package kyh.api;

import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;

import kyh.api.domain.dto.user.MenuInfo;
import kyh.api.domain.dto.user.UserDetailInfo;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.QAuthority;
import kyh.api.domain.entity.QAuthorityMenu;
import kyh.api.domain.entity.QMenu;
import kyh.api.domain.entity.QUser;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.AuthorityRepository;
import kyh.api.repository.UserRepository;

@SpringBootTest
@Transactional
public class QuerydslTest {

  private final String USER_NAME = "test";

  @Autowired
  private JPAQueryFactory queryFactory;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private AuthorityRepository authorityRepository;

  @BeforeEach
  public void beforeInsertDummyData() {
    Optional<User> findUser = userRepository.findByName(USER_NAME);
    if (findUser.isPresent())
      return;

    Authority auth = authorityRepository.findByRole(UserRole.SUPER).orElseThrow();
    User user = new User(USER_NAME, "password", auth);

    authorityRepository.save(auth);
    userRepository.save(user);
  }

  @DisplayName("querydsl 사용및 최적화 테스트")
  @Test
  public void querydslOptimization() {
    User user = findWithMenuByName1(USER_NAME).orElse(null);
    UserInfo userInfo1 = UserInfo.generate(user);
    UserInfo userInfo2 = findWithMenuByName2(USER_NAME).orElse(null);

    System.out.println(userInfo1);
    System.out.println(userInfo2);

    Assertions.assertThat(userInfo1.getName()).isEqualTo(userInfo2.getName());
  }

  public Optional<User> findWithMenuByName1(String name) {
    QUser user = QUser.user;
    QAuthority authority = QAuthority.authority;
    QAuthorityMenu authorityMenu = QAuthorityMenu.authorityMenu;
    QMenu menu = QMenu.menu;

    return Optional.ofNullable(queryFactory
        .selectFrom(user)
        .join(user.authority, authority).fetchJoin()
        .join(authority.authorityMenus, authorityMenu).fetchJoin()
        .join(authorityMenu.menu, menu).fetchJoin()
        .where(user.name.eq(name))
        .orderBy(menu.seq.asc())
        .fetchOne());
  }

  public Optional<UserInfo> findWithMenuByName2(String name) {
    QUser user = QUser.user;
    QAuthority authority = QAuthority.authority;
    QAuthorityMenu authorityMenu = QAuthorityMenu.authorityMenu;
    QMenu menu = QMenu.menu;

    List<Tuple> tuples = queryFactory
        .select(
            user.id,
            user.name,
            user.password,
            authority.role,
            menu.path,
            menu.text)
        .from(user)
        .join(user.authority, authority)
        .join(authority.authorityMenus, authorityMenu)
        .join(authorityMenu.menu, menu)
        .where(user.name.eq(name))
        .orderBy(menu.seq.asc())
        .fetch();

    if (tuples.size() < 1)
      return Optional.empty();

    Tuple tuple = tuples.get(0);
    UserDetailInfo userDetailInfo = new UserDetailInfo(
        tuple.get(user.id),
        tuple.get(user.name),
        tuple.get(user.password),
        tuple.get(authority.role)//
    );

    List<MenuInfo> menuInfos = tuples.stream().map(tp -> new MenuInfo(tp.get(menu.path), tp.get(menu.text)))
        .toList();

    return Optional.of(new UserInfo(userDetailInfo, menuInfos));
  }

}

package kyh.api.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kyh.api.domain.entity.User;
import kyh.api.domain.entity.QAuthority;
import kyh.api.domain.entity.QAuthorityMenu;
import kyh.api.domain.entity.QMenu;
import kyh.api.domain.entity.QUser;

@Repository
public class UserQueryRepository {

  private final JPAQueryFactory queryFactory;

  public UserQueryRepository(EntityManager entityManager) {
    queryFactory = new JPAQueryFactory(entityManager);
  }

  public User findWithMenuByName(String name) {
    QUser user = QUser.user;
    QAuthority authority = QAuthority.authority;
    QAuthorityMenu authorityMenu = QAuthorityMenu.authorityMenu;
    QMenu menu = QMenu.menu;

    return queryFactory
        .select(user)
        .from(user)
        .join(user.authority, authority).fetchJoin()
        .join(authority.authorityMenus, authorityMenu).fetchJoin()
        .join(authorityMenu.menu, menu).fetchJoin()
        .where(user.name.eq(name))
        .orderBy(menu.seq.asc())
        .fetchOne();
  }

}

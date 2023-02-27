package kyh.api.repository;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import kyh.api.domain.entity.Member;
import kyh.api.domain.entity.QAuthority;
import kyh.api.domain.entity.QAuthorityMenu;
import kyh.api.domain.entity.QMember;
import kyh.api.domain.entity.QMenu;

@Repository
public class MemberQueryRepository {

  private final JPAQueryFactory queryFactory;

  public MemberQueryRepository(EntityManager entityManager) {
    queryFactory = new JPAQueryFactory(entityManager);
  }

  public Member findWithMenuByUsername(String username) {
    QMember member = QMember.member;
    QAuthority authority = QAuthority.authority;
    QAuthorityMenu authorityMenu = QAuthorityMenu.authorityMenu;
    QMenu menu = QMenu.menu;

    return queryFactory
        .select(member)
        .from(member)
        .join(member.authority, authority).fetchJoin()
        .join(authority.authorityMenus, authorityMenu).fetchJoin()
        .join(authorityMenu.menu, menu).fetchJoin()
        .where(member.username.eq(username))
        .orderBy(menu.seq.asc())
        .fetchOne();
  }

}

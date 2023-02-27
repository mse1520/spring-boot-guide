package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {

  Optional<Member> findByUsername(String username);

  @Query("select mb"
      + " from Member mb"
      + " join fetch mb.authority a"
      + " join fetch a.authorityMenus am"
      + " join fetch am.menu mn"
      + " where mb.username = :username"
      + " order by mn.seq asc")
  Optional<Member> findWithMenuByUsername(@Param("username") String username);

}

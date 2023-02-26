package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.type.UserRole;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {

  Optional<Authority> findByRole(UserRole role);

  @Query("select a"
      + " from Authority a"
      + " join fetch a.authorityMenus am"
      + " join fetch am.menu m"
      + " where a.role = :role"
      + " order by m.seq asc")
  Optional<Authority> findWithMenuByRole(@Param("role") UserRole role);

}

package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findByName(String name);

  @Query("select u"
      + " from User u"
      + " join fetch u.authority a"
      + " join fetch a.authorityMenus am"
      + " join fetch am.menu m"
      + " where u.name = :name"
      + " order by m.seq asc")
  Optional<User> findWithMenuByName(@Param("name") String name);

}

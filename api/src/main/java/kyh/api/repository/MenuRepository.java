package kyh.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import kyh.api.domain.entity.Menu;
import kyh.api.domain.type.UserRole;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query("select m from Menu m where m.role = :role order by m.seq asc")
    List<Menu> findAllByRole(@Param("role") UserRole role);
}

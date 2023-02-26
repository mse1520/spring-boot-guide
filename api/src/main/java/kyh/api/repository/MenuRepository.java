package kyh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    // @Query("select m from Menu m where m.role = :role order by m.seq asc")
    // List<Menu> findAllByRole(@Param("role") UserRole role);
}

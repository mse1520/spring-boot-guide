package kyh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}

package kyh.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Transactional
    List<Menu> deleteByIdNotIn(List<Long> ids);
}

package kyh.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.entity.AuthorityMenu;

public interface AuthorityMenuRepository extends JpaRepository<AuthorityMenu, Long> {
}

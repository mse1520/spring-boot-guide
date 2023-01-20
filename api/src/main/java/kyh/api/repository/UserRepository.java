package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByName(String name);
}

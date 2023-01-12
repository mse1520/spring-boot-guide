package kyh.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByName(String name);
}

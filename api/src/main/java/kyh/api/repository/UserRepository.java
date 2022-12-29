package kyh.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import kyh.api.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByName(String name);
}

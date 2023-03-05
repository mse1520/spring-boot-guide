package kyh.api.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.type.UserRole;

@Mapper
public interface AuthorityDao {
  Optional<Authority> findByRole(UserRole role);
}

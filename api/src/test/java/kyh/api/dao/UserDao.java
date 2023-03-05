package kyh.api.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import kyh.api.domain.entity.User;

@Mapper
public interface UserDao {

  Optional<User> findByName(String name);

  Integer save(User user);

}

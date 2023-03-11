package kyh.api.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

import kyh.api.domain.dto.user.MenuInfo;
import kyh.api.domain.dto.user.UserDetailInfo;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.type.UserRole;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserQueryDao {

  private final SqlSession sqlSession;

  public Optional<UserInfo> findWithMenuByName(String name) {
    List<Map<String, Object>> datas = sqlSession.selectList("kyh.api.dao.UserDao.findWithMenuByName", name);

    if (datas.size() < 1)
      return Optional.empty();

    Map<String, Object> first = datas.get(0);
    UserDetailInfo userDetailInfo = new UserDetailInfo(
        (Long) first.get("id"),
        (String) first.get("name"),
        (String) first.get("password"),
        UserRole.valueOf((String) first.get("role"))//
    );

    List<MenuInfo> menuInfos = datas.stream()
        .map(data -> new MenuInfo((String) data.get("path"), (String) data.get("text"), (String) data.get("img")))
        .toList();

    return Optional.of(new UserInfo(userDetailInfo, menuInfos));
  }

}
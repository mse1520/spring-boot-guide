package kyh.api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.menu.MenuInfo;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.User;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.MenuRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    public List<MenuInfo> info(UserInfo userInfo) {
        // if (userInfo == null) {
        // User user = new User(null, null, UserRole.USER);
        // userInfo = new UserInfo(user);
        // }

        // return
        // menuRepository.findAllByRole(userInfo.getRole()).stream().map(MenuInfo::new).toList();
        return null;
    }

}

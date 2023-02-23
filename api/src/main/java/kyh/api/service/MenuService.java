package kyh.api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.dto.menu.MenuInfo;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.MenuRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    public List<MenuInfo> info(UserRole role) {
        if (role == null)
            role = UserRole.USER;

        return menuRepository.findAllByRole(role).stream().map(MenuInfo::new).toList();
    }

}

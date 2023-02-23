package kyh.api.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import kyh.api.domain.dto.menu.MenuInfo;
import kyh.api.domain.dto.user.UserInfo;
import kyh.api.domain.entity.User;
import kyh.api.service.MenuService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping(value = "/menu")
    public List<MenuInfo> menu(@AuthenticationPrincipal UserInfo userInfo) {
        if (userInfo == null) {
            User user = new User(null, null, null);
            userInfo = new UserInfo(user);
        }

        return menuService.info(userInfo.getRole());
    }

}

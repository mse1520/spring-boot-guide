package kyh.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.AuthorityMenu;
import kyh.api.domain.entity.Menu;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.AuthorityMenuRepository;
import kyh.api.repository.AuthorityRepository;
import kyh.api.repository.MenuRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataService {
  private final AuthorityRepository authorityRepository;
  private final MenuRepository menuRepository;
  private final AuthorityMenuRepository authorityMenuRepository;

  @PostConstruct
  private void init() {
    createAuth();
    createMenu();
  }

  @Transactional
  private List<Authority> createAuth() {
    List<Authority> authorities = authorityRepository.findAll();

    List<Authority> saveList = new ArrayList<>();
    saveList.add(newAuthItem(authorities, UserRole.SUPER));
    saveList.add(newAuthItem(authorities, UserRole.ADMIN));
    saveList.add(newAuthItem(authorities, UserRole.USER));

    return authorityRepository.saveAll(saveList.stream().filter(auth -> auth != null).toList());
  }

  @Transactional
  private void createMenu() {
    List<Menu> menus = menuRepository.findAll();

    Menu home = newMenuItem(menus, new Menu("/", "홈", "/resources/img/home.png", 1));
    Menu boardWrite = newMenuItem(menus, new Menu("/board/write", "게시글 작성", "/resources/img/editing.png", 2));
    Menu boardInfo = newMenuItem(menus, new Menu("/board/info", "게시글", "/resources/img/board.png", 3));
    List<Menu> saveMenuList = Arrays.asList(home, boardWrite, boardInfo);

    menuRepository.saveAll(saveMenuList);
    menuRepository.deleteByIdNotIn(saveMenuList.stream().map(menu -> menu.getId()).toList());

    List<Authority> authorities = authorityRepository.findAll();
    Authority authSuper = getAuth(authorities, UserRole.SUPER);
    Authority authAdmin = getAuth(authorities, UserRole.ADMIN);
    Authority authUser = getAuth(authorities, UserRole.USER);

    List<AuthorityMenu> authorityMenus = new ArrayList<>();

    authorityMenus.add(new AuthorityMenu(authSuper, home));
    authorityMenus.add(new AuthorityMenu(authSuper, boardWrite));
    authorityMenus.add(new AuthorityMenu(authSuper, boardInfo));

    authorityMenus.add(new AuthorityMenu(authAdmin, home));
    authorityMenus.add(new AuthorityMenu(authAdmin, boardWrite));
    authorityMenus.add(new AuthorityMenu(authAdmin, boardInfo));

    authorityMenus.add(new AuthorityMenu(authUser, home));
    authorityMenus.add(new AuthorityMenu(authUser, boardInfo));

    authorityMenuRepository.deleteAllInBatch();
    authorityMenuRepository.saveAll(authorityMenus);
  }

  private Authority newAuthItem(List<Authority> authorities, UserRole role) {
    Long count = authorities.stream().filter(auth -> auth.getRole() == role).count();
    return count < 1 ? new Authority(role) : null;
  }

  private Menu newMenuItem(List<Menu> menus, Menu menu) {
    Menu findMenu = menus.stream().filter(_menu -> _menu.getPath().equals(menu.getPath())).findFirst().orElse(menu);
    findMenu.changeData(menu.getText(), menu.getImgPath(), menu.getSeq());
    return findMenu;
  }

  private Authority getAuth(List<Authority> authorities, UserRole role) {
    return authorities.stream()
        .filter(auth -> auth.getRole() == role)
        .findFirst()
        .orElseThrow();
  }
}

package kyh.api.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import jakarta.annotation.PostConstruct;
import kyh.api.domain.entity.Menu;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.AuthorityMenu;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.MenuRepository;
import kyh.api.service.DummyDataService;
import kyh.api.repository.AuthorityMenuRepository;
import kyh.api.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;

@Configuration
public class InitailizeConfig {

  @Bean
  public Initailizer initailizer(AuthorityRepository authorityRepository, MenuRepository menuRepository,
      AuthorityMenuRepository authorityMenuRepository) {
    return new Initailizer(authorityRepository, menuRepository, authorityMenuRepository);
  }

  @RequiredArgsConstructor
  private static class Initailizer {

    private final AuthorityRepository authorityRepository;
    private final MenuRepository menuRepository;
    private final AuthorityMenuRepository authorityMenuRepository;

    @Autowired
    private DummyDataService dummyDataService;

    @PostConstruct
    private void init() {
      createAuth();
      createMenu();
      dummyDataService.make();
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

      Menu home = newMenuItem(menus, new Menu("/", "홈", 1));
      Menu boardWrite = newMenuItem(menus, new Menu("/board/write", "게시글 작성", 2));
      Menu boardInfo = newMenuItem(menus, new Menu("/board/info", "게시글", 3));
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
      findMenu.changeTextAndSeq(menu.getText(), menu.getSeq());
      return findMenu;
    }

    private Authority getAuth(List<Authority> authorities, UserRole role) {
      return authorities.stream()
          .filter(auth -> auth.getRole() == role)
          .findFirst()
          .orElseThrow();
    }

  }

}

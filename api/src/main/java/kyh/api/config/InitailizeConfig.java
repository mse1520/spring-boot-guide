package kyh.api.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Menu;
import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.AuthorityMenu;
import kyh.api.domain.type.MemberRole;
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
      saveList.add(newAuthItem(authorities, MemberRole.SUPER));
      saveList.add(newAuthItem(authorities, MemberRole.ADMIN));
      saveList.add(newAuthItem(authorities, MemberRole.USER));

      return authorityRepository.saveAll(saveList.stream().filter(auth -> auth != null).toList());
    }

    @Transactional
    private void createMenu() {
      Menu home = new Menu("/", "홈", 1);
      Menu boardWrite = new Menu("/board/write", "게시글 작성", 2);
      Menu boardInfo = new Menu("/board/info", "게시글", 3);

      menuRepository.deleteAll();
      menuRepository.saveAll(Arrays.asList(home, boardWrite, boardInfo));

      List<Authority> authorities = authorityRepository.findAll();
      Authority authSuper = getAuth(authorities, MemberRole.SUPER);
      Authority authAdmin = getAuth(authorities, MemberRole.ADMIN);
      Authority authUser = getAuth(authorities, MemberRole.USER);

      List<AuthorityMenu> authorityMenus = new ArrayList<>();

      authorityMenus.add(new AuthorityMenu(authSuper, home));
      authorityMenus.add(new AuthorityMenu(authSuper, boardWrite));
      authorityMenus.add(new AuthorityMenu(authSuper, boardInfo));

      authorityMenus.add(new AuthorityMenu(authAdmin, home));
      authorityMenus.add(new AuthorityMenu(authAdmin, boardWrite));
      authorityMenus.add(new AuthorityMenu(authAdmin, boardInfo));

      authorityMenus.add(new AuthorityMenu(authUser, home));
      authorityMenus.add(new AuthorityMenu(authUser, boardInfo));

      authorityMenuRepository.saveAll(authorityMenus);
    }

    private Authority newAuthItem(List<Authority> authorities, MemberRole role) {
      Long count = authorities.stream().filter(auth -> auth.getRole() == role).count();
      return count < 1 ? new Authority(role) : null;
    }

    private Authority getAuth(List<Authority> authorities, MemberRole role) {
      return authorities.stream()
          .filter(auth -> auth.getRole() == role)
          .findFirst()
          .orElseThrow();
    }

  }

}

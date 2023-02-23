package kyh.api.config;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import kyh.api.domain.entity.Menu;
import kyh.api.domain.type.UserRole;
import kyh.api.repository.MenuRepository;
import lombok.RequiredArgsConstructor;

@Configuration
public class InitailizeConfig {

    @Bean
    public Initailizer initailizer(MenuRepository menuRepository) {
        return new Initailizer(menuRepository);
    }

    @RequiredArgsConstructor
    private static class Initailizer {

        private final MenuRepository menuRepository;

        @PostConstruct
        private void init() {
            createMenu();
        }

        @Transactional
        private void createMenu() {
            List<Menu> menus = new ArrayList<>();

            menus.add(new Menu("/home", "홈", UserRole.SUPER, 1));
            menus.add(new Menu("/board/write", "게시글 작성", UserRole.SUPER, 2));
            menus.add(new Menu("/board/info", "게시글", UserRole.SUPER, 3));

            menus.add(new Menu("/home", "홈", UserRole.ADMIN, 1));
            menus.add(new Menu("/board/write", "게시글 작성", UserRole.ADMIN, 2));
            menus.add(new Menu("/board/info", "게시글", UserRole.ADMIN, 3));

            menus.add(new Menu("/home", "홈", UserRole.USER, 1));
            menus.add(new Menu("/board/info", "게시글", UserRole.USER, 2));

            menuRepository.deleteAll();
            menuRepository.saveAll(menus);
        }

    }

}

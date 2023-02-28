package kyh.api.domain.dto.member;

import java.util.List;

import kyh.api.domain.entity.Authority;
import kyh.api.domain.entity.AuthorityMenu;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MenuInfo {

  private String path;
  private String text;

  private MenuInfo(AuthorityMenu authorityMenu) {
    path = authorityMenu.getMenu().getPath();
    text = authorityMenu.getMenu().getText();
  }

  public static List<MenuInfo> generate(Authority authority) {
    return authority.getAuthorityMenus().stream().map(MenuInfo::new).toList();
  }

}

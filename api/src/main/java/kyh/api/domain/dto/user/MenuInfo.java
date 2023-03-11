package kyh.api.domain.dto.user;

import kyh.api.domain.entity.AuthorityMenu;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class MenuInfo {

  private String path;
  private String text;
  private String img;

  public MenuInfo(AuthorityMenu authorityMenu) {
    path = authorityMenu.getMenu().getPath();
    text = authorityMenu.getMenu().getText();
    img = authorityMenu.getMenu().getImgPath();
  }

}

package kyh.api.domain.dto.menu;

import kyh.api.domain.entity.Menu;
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

    public MenuInfo(Menu menu) {
        path = menu.getPath();
        text = menu.getText();
    }

}

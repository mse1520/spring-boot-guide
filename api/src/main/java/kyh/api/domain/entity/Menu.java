package kyh.api.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import kyh.api.domain.type.UserRole;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "menu_id")
    private Long id;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(nullable = false)
    private Long seq;

    public Menu(String path, String text, UserRole role, long seq) {
        this.path = path;
        this.text = text;
        this.role = role;
        this.seq = seq;
    }

}

package kyh.api;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Arrays;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import kyh.api.repository.UserRepository;
import kyh.api.service.UserService;
import lombok.var;

public class LombokTest {

  @DisplayName("롬복 @RequiredArgsConstructor 사용시 생성되는 생성자 테스트")
  @Test
  public void RequiredArgsConstructorTest() {
    // private final String SESSION_KEY = "USER";
    // private final UserRepository userRepository;
    // private final PasswordEncoder passwordEncoder;

    var parameterTypes = Arrays.asList(UserService.class.getConstructors()).stream()
        .flatMap(constructor -> Arrays.asList(constructor.getParameterTypes()).stream())
        .toList();

    System.out.println(parameterTypes);
    System.out.println(parameterTypes.size());

    System.out.println(UserRepository.class.getName());
    System.out.println(parameterTypes.get(0).getName());

    System.out.println(PasswordEncoder.class.getName());
    System.out.println(parameterTypes.get(1).getName());

    assertEquals(2, parameterTypes.size());
    assertEquals(UserRepository.class.getName(), parameterTypes.get(0).getName());
    assertEquals(PasswordEncoder.class.getName(), parameterTypes.get(1).getName());
  }

}

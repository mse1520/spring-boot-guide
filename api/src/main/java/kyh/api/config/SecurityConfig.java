package kyh.api.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(csrf -> csrf.disable())
        .formLogin(form -> form
            .usernameParameter("name")
            .passwordParameter("password")
            .loginProcessingUrl("/user/sign-in")
            .defaultSuccessUrl("/user/info")
            .failureHandler(authenticationFailureHandler()))
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  public AuthenticationFailureHandler authenticationFailureHandler() {
    return new CustomAuthFailureHandler();
  }

  private final static class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {
      String errMsg = "";

      if (exception instanceof BadCredentialsException)
        errMsg = "회원 인증에 실패하였습니다.";
      else if (exception instanceof UsernameNotFoundException)
        errMsg = "아이디를 찾을 수 없습니다.";
      else
        errMsg = "알 수 없는 이유로 로그인에 실패하였습니다.";

      setDefaultFailureUrl("/user/error?msg=" + errMsg);

      super.onAuthenticationFailure(request, response, exception);
    }

  }

}
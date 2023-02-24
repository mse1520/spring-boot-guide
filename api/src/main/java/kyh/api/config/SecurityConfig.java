package kyh.api.config;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@EnableWebSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    String unAuthMessage = URLEncoder.encode("인증되지 않은 사용자입니다.", "UTF-8");

    return http
        .csrf(csrf -> csrf.disable())
        .authorizeRequests(auth -> auth
            .antMatchers("/board/write", "/comment/write").authenticated()
            .antMatchers(HttpMethod.DELETE, "/board/*/info", "/comment/*/info").authenticated()
            .antMatchers(HttpMethod.PUT, "/board/*/info", "/comment/*/info").authenticated()
            .anyRequest().permitAll())
        .exceptionHandling(exception -> exception
            .authenticationEntryPoint((request, response, authException) -> response
                .sendRedirect(request.getContextPath() + "/user/error?message=" + unAuthMessage)))
        .formLogin(form -> form
            .usernameParameter("name")
            .passwordParameter("password")
            .loginProcessingUrl("/user/sign-in")
            .defaultSuccessUrl("/user/sign-in")
            .failureHandler(new CustomAuthFailureHandler()))
        .logout(logout -> logout
            .logoutUrl("/user/sign-out")
            .logoutSuccessUrl("/user/info")
            .deleteCookies("JSESSIONID"))
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  private static class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
        AuthenticationException exception) throws IOException, ServletException {
      String errorMessage = "";

      if (exception instanceof UsernameNotFoundException)
        errorMessage = exception.getMessage();
      else if (exception instanceof BadCredentialsException)
        errorMessage = "회원 인증에 실패하였습니다.";
      else
        errorMessage = "알 수 없는 이유로 회원 인증에 실패하였습니다.";

      errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
      setDefaultFailureUrl("/user/error?message=" + errorMessage);

      super.onAuthenticationFailure(request, response, exception);
    }

  }

}
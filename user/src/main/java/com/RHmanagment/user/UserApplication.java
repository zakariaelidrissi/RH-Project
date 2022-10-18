package com.RHmanagment.user;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Entities.UserRole;
import com.RHmanagment.user.Repositories.UserRepository;
import com.google.common.hash.HashCode;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class UserApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserApplication.class, args);
	}
/*
	@Bean
	CommandLineRunner start(UserRepository userRepository, RepositoryRestConfiguration restconfiguration){
		return args -> {
			restconfiguration.exposeIdsFor(User.class);

			BCryptPasswordEncoder bcp =new BCryptPasswordEncoder();
			userRepository.save(new User(null,"masculin","KHTOU","Otmane","khtouotman@gmail.com", bcp.encode("ok123"), "0618566121", UserRole.ADMIN));
			userRepository.save(new User(null,"masculin","IDRISSI","Zaki","zr7@gmail.com",bcp.encode("zr123"),"0612345678",UserRole.EMPLOYER));
			userRepository.save(new User(null,"masculin","AKAJDAOU","Nabil","na@gmail.com",bcp.encode("na123"),"0609876543",UserRole.STAGIAIRE));

			userRepository.findAll().forEach(System.out::println);
		};
	}*/
}
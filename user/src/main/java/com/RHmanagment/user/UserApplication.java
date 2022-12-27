package com.RHmanagment.user;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Entities.UserRole;
import com.RHmanagment.user.Repositories.UserRepository;
import com.RHmanagment.user.Service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Date;

@SpringBootApplication
public class UserApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }
	@Bean
    CommandLineRunner start(UserService userRepository, RepositoryRestConfiguration restconfiguration){
		return args -> {
			restconfiguration.exposeIdsFor(User.class);

            userRepository.addUser(new User(null,"UA120929","masculin","KHTOU","Otmane", new Date("20/12/2000"),"khtouotman@gmail.com","123","0618566121", UserRole.ADMIN));
            userRepository.addUser(new User(null,"AB984256","masculin","IDRISSI","Zakaria", new Date("21/12/2000"),"idrissizakaria@gmail.com","123","0612345678", UserRole.EMPLOYER));
            userRepository.addUser(new User(null,"S452893","masculin","AKAJDAOU","Nabil", new Date("22/12/2000"),"akajdaounabil@gmail.com","123","0609876543",UserRole.STAGIAIRE));

            userRepository.getAllUsers().forEach(System.out::println);
		};
	}
}

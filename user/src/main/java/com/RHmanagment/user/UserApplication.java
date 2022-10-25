package com.RHmanagment.user;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Entities.UserRole;
import com.RHmanagment.user.Repositories.UserRepository;
import com.RHmanagment.user.Web.UserRestController;
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

	//@Bean
	CommandLineRunner start(UserRestController userRepository, RepositoryRestConfiguration restconfiguration){
		restconfiguration.exposeIdsFor(User.class);
		BCryptPasswordEncoder bcp =new BCryptPasswordEncoder();
		return args -> {
			User user1 = new User(null,"masculin","KHTOU","Otmane","khtouotman@gmail.com", bcp.encode("ok123"), "0618566121", UserRole.ADMIN, false, "rtloki45698kdiury");
			User user2 = new User(null,"masculin","EL IDRISSI","Zakaria","zr7@gmail.com",bcp.encode("zr123"),"0612345678",UserRole.EMPLOYER, false, "lpohhehio5345848de");
			User user3 = new User(null,"masculin","AKAJDAOU","Nabil","na@gmail.com",bcp.encode("na123"),"0609876543",UserRole.STAGIAIRE, false, "koopk54959ijoo");
			userRepository.addUser(user1);
			userRepository.addUser(user2);
			userRepository.addUser(user3);
			//userRepository.findAll().forEach(System.out::println);
		};
	}
}
package com.RHmanagment.user.Web;

import com.RHmanagment.user.Entities.User;
import com.RHmanagment.user.Model.ChangePassword;
import com.RHmanagment.user.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @AllArgsConstructor
@CrossOrigin("*")
public class UserRestController {
    private UserService userService;

    // ************************ GET **************************
    @GetMapping(path = "/users")
    public List<User> getAllUser() {
        return userService.getAllUsers();
    }

    @GetMapping(path = "/users/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    /*@GetMapping(path = "/users/user/{id}")
    public User getUserByUserId(@PathVariable Long id) {
        return userService.getUserById(id);
    }*/

    /*@GetMapping(path = "/users/user/{email}")
    public User getUserByEmail(@PathVariable String email){
        return userService.login(email);
    }*/

    // ************************ POST **************************
    @PostMapping(path = "/users")
    public User addUser(@RequestBody User UsrReq) {
        return userService.addUser(UsrReq);
    }

    // ************************ PUT **************************
    @PutMapping(path = "/users")
    public User updateUser(@RequestBody User UsrReq) {
        return userService.updateUser(UsrReq);
    }

    @PutMapping(path = "/users/changePassword")
    public void changePassword(@RequestBody ChangePassword change){
        userService.changePassword(change);
    }

    // ************************ DELETE **************************
    @DeleteMapping(path = "/users/{id}")
    public void deleteById(@PathVariable Long id) {
        userService.deleteById(id);
    }


    //************   M A I L   µµµµµµµµµµµµµµµµµµµ//
/*
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @RequestMapping(value="/register", method = RequestMethod.GET)
    public ModelAndView displayRegistration(ModelAndView modelAndView, User User)
    {
        modelAndView.addObject("User", User);
        modelAndView.setViewName("register");
        return modelAndView;
    }



    @RequestMapping(value="/register", method = RequestMethod.POST)
    public ModelAndView registerUser(ModelAndView modelAndView, User User)
    {

        User existingUser = userRepository.findByEmailIdIgnoreCase(User.getEmailId());
        if(existingUser != null)
        {
            modelAndView.addObject("message","Cet Email existe déjà!");
            modelAndView.setViewName("error");
        }
        else
        {
            userRepository.save(User);

            ConfirmationToken confirmationToken = new ConfirmationToken(User);

            confirmationTokenRepository.save(confirmationToken);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(User.getEmailId());
            mailMessage.setSubject("Inscription Completée!");
            mailMessage.setFrom("   K H T O U O T M A N @ G M A I L . C O M   ");
            mailMessage.setText("Pour confirmer votre compte, veuillez cliquer ici : "+"http://localhost:8080/confirm-account?token="+confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            modelAndView.addObject("emailId", User.getEmailId());

            modelAndView.setViewName("successfulRegisteration");
        }

        return modelAndView;
    }


    @RequestMapping(value="/confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView confirmUserAccount(ModelAndView modelAndView, @RequestParam("token")String confirmationToken)
    {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if(token != null)
        {
           // User user = userRepository.findByEmailIdIgnoreCase(token.getUser().getEmailId());
            //user.setEnabled(true);
            //userRepository.save(user);
            modelAndView.setViewName("accountVerified");
        }
        else
        {
            modelAndView.addObject("message","Erreur :Le lien est invalide!");
            modelAndView.setViewName("error");
        }

        return modelAndView;
    }*/
}



package demo;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;

@WebListener
public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Setting a global attribute in ServletContext
        sce.getServletContext().setAttribute("globalMessage", "Welcome to the Global Greeting App!");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Cleanup when the application is stopped
    }
}

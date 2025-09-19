import { Express, Router } from "express";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

/**
 * Users module
 */
export class UsersModule {
  private readonly usersController: UsersController;

  constructor() {
    const usersService = new UsersService();
    this.usersController = new UsersController(usersService);
  }

  /**
   * Register module routes and middleware
   * @param app Express application instance
   */
  register(app: Express): void {
    const router = Router();

    // User routes
    router.get(
      "/profile",
      this.usersController.getProfile.bind(this.usersController),
    );
    router.get(
      "/",
      this.usersController.getAllUsers.bind(this.usersController),
    );

    // Register routes
    app.use("/api/users", router);

    console.log("Users module registered");
  }
}

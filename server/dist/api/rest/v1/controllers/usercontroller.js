import { UserService } from "../../../../services/user-service.js";
import { ApiResponse } from "../../../../utils/response.js";
export class UserController {
    constructor() {
        this.getProfile = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const user = await this.userService.getUserById(userId);
                return ApiResponse.success(res, user);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const user = await this.userService.UpdateUser(userId, req.body);
                return ApiResponse.success(res, user, "Profile Updated Successfully ");
            }
            catch (error) {
                next(error);
            }
        };
        this.getAllUser = async (req, res, next) => {
            try {
                const { page = 1, limit = 10, role, status } = req.query;
                const users = await this.userService.getAllUsers({
                    page: parseInt(page),
                    limit: parseInt(limit),
                    role: role,
                    status: status
                });
                return ApiResponse.success(res, users);
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const user = await this.userService.getUserById(id);
                return ApiResponse.success(res, user);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUserStatus = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const user = await this.userService.UpdateUserStatus(id, status);
                return ApiResponse.success(res, user, "User updated Successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.userService = new UserService();
    }
}

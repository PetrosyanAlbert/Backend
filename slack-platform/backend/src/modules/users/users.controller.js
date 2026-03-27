import { ok } from "../../shared/utils/index.js";
import { getMe } from "./users.service.js";

export const me = async (req, res) => {
    const user = await getMe(req.user.sub);
    return ok(res, "Profile retrieved successfully", { user });
};



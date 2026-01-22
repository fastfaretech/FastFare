import * as userService from "../user/user.service";

export const approveKyc = () => {
  return userService.adminApprove();
};

export const rejectKyc = (reason: string) => {
  return userService.adminReject(reason);
};

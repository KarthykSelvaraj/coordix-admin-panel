export interface AdminUserDTO {
  id: number;
  userRoleId: number;
  roleName: string;
  userGuid: string;
  userName: string;
  emailId: string;
  mobileNo: string;
  userId: string;
  password: string;
  blocked: boolean;
  resetId: string;
  resetOn: string; // ISO date string (can be converted to Date if needed)
  resetIP: string;
  logTime: string; // ISO date string
  logIP: string;
  profileImageURL: string;
  createdOn: string; // ISO date string
  createdByUserName: string;
  modifiedOn: string; // ISO date string
  modifiedByUserName: string;
  status: string;
}

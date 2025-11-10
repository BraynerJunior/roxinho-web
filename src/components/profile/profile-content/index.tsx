import { ProfileContentPersonal } from "./profile-content-personal";
import { ProfileContentAccount } from "./profile-content-account";
import { ProfileContentSecurity } from "./profile-content-security";
import { ProfileContentNotification } from "./profile-content-notification";
import { ProfileContentRoot } from "./profile-content-root";

const ProfileContent = Object.assign(ProfileContentRoot, {
  Personal: ProfileContentPersonal,
  Account: ProfileContentAccount,
  Security: ProfileContentSecurity,
  Notifications: ProfileContentNotification,
});

export default ProfileContent;

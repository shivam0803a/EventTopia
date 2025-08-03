import PageTitle from "../../../components/page-title";
import userGlobelStore, { UsersStoreType } from "../../../store/user-store";

function ProfilePage() {
  const { currentUser }: UsersStoreType = userGlobelStore() as UsersStoreType;

  const renderUserProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label} </span>
        <span className="text-gray-800 font-semibold">{ value}</span>
      </div>
    );
  };

  return (
    <div>
      <PageTitle title="Profile Page" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
      {renderUserProperty("User",currentUser?._id)}
      {renderUserProperty("Name",currentUser?.name)}
      {renderUserProperty("Email",currentUser?.email)}
      {/* {renderUserProperty("JoinedAt",currentUser?.createAt)} */}
      {renderUserProperty("Status",currentUser?.isActive?"Active":"InActive")}
      {renderUserProperty("Role",currentUser?.isAdmin?"Admin":"User")}
      </div>
    </div>
  );
}

export default ProfilePage;

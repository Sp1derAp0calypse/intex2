import UserNavBar from "../components/UserNavBar";

function UserHomePage() {
  return (
    <>
      <UserNavBar />
      <h2>Recommended for you</h2>
      {/* recommendation movies */}
      <div>MovieCardList component goes here</div>
      <h2>Because you watched "blah"</h2>
      {/* recommendation based on the recently watched movies */}
      <div>MovieCardList component goes here</div>
      <h2>New releases</h2>
      {/* new movies */}
      <div>MovieCardList component goes here</div>
    </>
  );
}

export default UserHomePage;

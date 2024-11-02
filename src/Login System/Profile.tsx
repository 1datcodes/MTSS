import Navbar from "../Tools/Navbar";

function Profile() {
    return (
        <div>
            <Navbar />
            <div className="Content">
                <h1>Profile</h1>
                <h2>Status</h2>
                <p>Username: {localStorage.getItem("username")}</p>
                <p>Access Type: {localStorage.getItem("access")}</p>
            </div>
        </div>
    );
}

export default Profile;
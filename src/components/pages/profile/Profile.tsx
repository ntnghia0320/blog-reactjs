import React from "react";
import currentUser from "../../../services/user-info";
const Profile = () => {
    return (
        <ul>
            {
                <>
                    <li>{currentUser().userId}</li>
                    <li>{currentUser().email}</li>
                    <li>{currentUser().role}</li>
                </>
            }
        </ul>
    );
};

export default Profile;
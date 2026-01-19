// import react from "react";
import "./DropDownProfile.css";

const DropDownProfile = () => {
    return(
        <div className="flex flex-col dropDownProfile">
            <ul className="flex flex-col gap-4">
                <li>Profile</li>
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default DropDownProfile;
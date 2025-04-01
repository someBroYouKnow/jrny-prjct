import './carasoul.css'


export default function Carasoul() {
  return (
    <div>
        
        <Card profilePic={'carousol_john.png'} profileName={"John Doe"} profileDesignation={"Director, ABC"} compliment={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} /> 
    </div>
  )
}

interface CardProps{
    profilePic:string;
    profileName: string;
    profileDesignation: string;
    compliment: string;
}

const Card = ({profilePic, profileName, profileDesignation,  compliment}:CardProps) =>{


    return (
        <div className="profile-card-container">
            <div className="profile-container">
                <img src={`${profilePic}` } alt="Profile picture" />
                <div className="profile-infor">
                    <span className="profile-name">{profileName}</span>
                    <span className="designation">{profileDesignation}</span>
                </div>
            </div>
            <div className="compliment">
                {compliment}
            </div>
        </div>
    )
}
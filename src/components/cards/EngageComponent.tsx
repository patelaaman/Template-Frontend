import { useEffect, useState } from "react";
import fallBackAvatar from '@/assets/images/avatar/default avatar.png'
import { LIVE_URL } from "@/utils/api";
import { Link } from "react-router-dom";

export const EngageComponent = ({ users, type }: { users: string[], type: string }) => {
    const [profiles, setProfiles] = useState<{ id: string, name: string, profileImg: string }[]>([]);
 const [id, setId] = useState("")
    useEffect(() => {
      if(!users) return
      
      const fetchProfiles = async () => {
        try {
          const responses = await Promise.all(users.map(userId =>
            fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId }),
            }).then(res => res.json())
          ));
          setId(responses.map(response => response?.data?.personalDetails?.id).join(','))
          const fetchedProfiles = responses.map((data, index) => ({
            id: users[index],
            name: data?.data?.personalDetails?.firstName || "Your connection",
            profileImg: data?.data?.profileImgUrl || fallBackAvatar,
           
          }));
          setProfiles(fetchedProfiles);
        } catch (error) {
          console.error("Error fetching user profiles:", error);
        }
      };
  
      if (users.length > 0) fetchProfiles();
    }, [users]);
  
    if (profiles.length === 0) return null;
  
    // Generate Display Names based on count
    const names = profiles.map(profile => profile.name);
    let displayNames = "";
  
    if (names.length === 1) {
      displayNames = names[0];
    } else if (names.length === 2) {
      displayNames = `${names[0]} and ${names[1]}`;
    } else {
      displayNames = `${names[0]}, ${names[1]}, and ${names.length - 2} others`;
    }
  
    const actionText = type === "like" ? "liked this post" : "commented on this post";
 
    return (
      <Link to={`/profile/feed/${id}`} className="d-flex align-items-center text-dark">
        <div className="d-flex">
          {profiles.slice(0, 3).map(profile => ( 
            <div
              key={profile.id}
              style={{
                position: "relative",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "5px"
              }}
            >
              <img
                src={profile.profileImg}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scale(1) rotate(0deg)",
                }}
              />
            </div>
          ))}
        </div>
        <p role="button" className="mt-3 mx-3">
          <span className="fw-bold">{displayNames} </span> {actionText}
        </p>
      </Link>
    );
  };
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Message = () => {
  const { userId } = useAuth();
  const [matches, setMatches] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/viewMatches/${userId}`)
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.error('Error fetching matches:', error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      const matchedUserDetails = [];
      for (const match of matches) {
        const response = await axios.get(`http://localhost:5000/api/users/findUser/${match.matched_user_id}`);
        matchedUserDetails.push(response.data);
      }
      setMatchedUsers(matchedUserDetails);
    };

    if (matches.length > 0) {
      fetchMatchedUsers();
    }
  }, [matches]);

  return (
    <div style={{padding: '20px'}}>
      <h1>My Matches</h1>
      {matchedUsers.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul>
          {matchedUsers.map((match) => (
            <li key={match.id} className="card match"
            style={{
              backgroundImage: `url(${
                match.profileImage
                  ? match.profileImage
                  : "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
              })`,
            }}>
              <h3>{match.firstName} {match.lastName} |  {match.department}  {match.course}</h3>
              <p>Bio: {match.bio}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Message;

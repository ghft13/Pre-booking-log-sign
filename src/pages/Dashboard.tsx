import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./UserDashboard";
import ProviderDashboard from "./ProviderDashboard";
import { Loader2 } from "lucide-react";

// Function to get user details from localStorage
const getUserFromLocalStorage = () => {
  const token = localStorage.getItem("doit-token");

  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
     console.log(storedUser)
    if (!storedUser) {
      navigate("/login");
    } else if (storedUser.role === "admin") {
      navigate("/admin");
    } else {
      setUser(storedUser);
    }

    setLoading(false);
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-doit-400" />
      </div>
    );

  return (
    <div className="min-h-screen pt-20 bg-muted/50">
      {user?.role === "provider" ? (
        <ProviderDashboard />
      ) : user?.role === "homeowner" ? (
        <UserDashboard />
      ) : (
        <div className="text-center p-10">
          <h1 className="text-xl font-semibold">Unknown Role</h1>
          <p>Please contact support.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

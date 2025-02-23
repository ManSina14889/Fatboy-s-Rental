// src/utils/auth.ts
export const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5004/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
  
      localStorage.setItem("token", data.token);
      return data; // This should contain user info and token if login is successful
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
      return null;
    }
};
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import { restApi } from "@/api";
import HandLoader from "@/components/Loader/HandLoader";

export type AuthContextValue = {
  email: string;
  username: string;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState<
    AuthContextValue | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await restApi.get("/api/v1/auth/me");

        const userData: AuthContextValue = {
          email: response.data.user.email,
          username: response.data.user.username,
        };
        setAuthenticatedUser(userData);
      } catch (error: any) {
        if (
          error?.response?.status === 401 &&
          error.response.data?.message !== "Unauthorized - Invalid token"
        ) {
          router.push("/login");
        } else {
          console.error("Error fetching user data:", error);
          // Handle other errors
          //router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const contextValue = useMemo(() => authenticatedUser, [authenticatedUser]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-800 flex items-center justify-center">
        {/* Spinner */}
        <HandLoader />
      </div>
    );
  }

  return (
    <>
      {authenticatedUser && (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default React.memo(AuthProvider);

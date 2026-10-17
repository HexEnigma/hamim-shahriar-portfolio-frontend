/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { clearTokens, getAccess, getRefresh, setTokens } from "@/api/tokens";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const qc = useQueryClient();
  const [hasToken, setHasToken] = useState(() => Boolean(getAccess() || getRefresh()));
  const me = useQuery({ queryKey: ["me"], queryFn: authApi.me, enabled: hasToken, retry: false, staleTime: Infinity });

  useEffect(() => {
    if (me.isError) { 
      clearTokens(); 
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasToken(false); 
    }
  }, [me.isError]);

  useEffect(() => {
    const onExpired = () => { setHasToken(false); qc.removeQueries({ queryKey: ["me"] }); };
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, [qc]);

  const login = useCallback(async (username, password) => {
    const data = await authApi.login(username, password);
    if (!data.user?.is_superuser) {
      throw Object.assign(new Error("Invalid credentials."), {
        response: { status: 401, data: { detail: "Invalid credentials." } },
      });
    }
    setTokens(data);
    qc.setQueryData(["me"], data.user);
    setHasToken(true);
    return data.user;
  }, [qc]);

  const logout = useCallback(async () => {
    try { if (getRefresh()) await authApi.logout(getRefresh()); } catch { /* token may already be invalid */ }
    clearTokens();
    setHasToken(false);
    qc.clear();
  }, [qc]);

  const user = hasToken ? me.data ?? null : null;
  const value = useMemo(
    () => ({ user, isOwner: Boolean(user?.is_superuser), login, logout, loading: hasToken && me.isPending }),
    [user, login, logout, hasToken, me.isPending]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
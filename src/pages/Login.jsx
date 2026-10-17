import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Skeleton";
import { useAuth } from "@/context/AuthContext";
import { getErrorMessage, loginSchema } from "@/utils/validators";

export default function Login() {
  const { isOwner, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const from = location.state?.from;
  const target = from ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}` : "/dashboard";

  if (loading) return <Spinner fullPage />;
  if (isOwner) return <Navigate to={target} replace />;

  const onSubmit = async ({ username, password }) => {
    setError("");
    try {
      await login(username, password);
      navigate(target, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Invalid credentials."));
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-2">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-[400px] space-y-2 rounded-lg border border-line bg-glass p-4 shadow-md">
        <p className="eyebrow">// owner access</p>
        <h1>Sign in</h1>
        {error && <p role="alert" className="rounded-md border border-danger p-2 text-danger">{error}</p>}
        <Input label="Username" autoComplete="username" error={errors.username?.message} {...register("username")} />
        <Input label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register("password")} />
        <Button type="submit" loading={isSubmitting} className="w-full">Sign in</Button>
      </form>
    </main>
  );
}
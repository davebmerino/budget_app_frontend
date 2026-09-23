// shadcn/ui primitives
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

// Icons
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from "lucide-react";

import { SignupSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/paths";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeTerms: true,
    },
  });

  function onSubmit(values) {
    setIsLoading(true);
    console.log("Creating Sovereign Vault account:", values);
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }

  return (
    <>
      <div className="min-h-screen bg-vault-bg text-vault-text flex flex-col justify-between items-center px-4 py-8 antialiased selection:bg-emerald-primary selection:text-black">
        {/* Mobile Shell Frame */}
        <div className="w-full max-w-[430px] flex flex-col items-center my-auto">
          {/* Brand Vault Emblem */}
          <div className="relative mb-5 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-vault-surface border border-vault-border flex items-center justify-center shadow-emerald-sm">
              <svg
                className="w-10 h-10"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="emGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 22L76 37V63L50 78L24 63V37L50 22Z"
                  stroke="url(#emGrad)"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 34L64 42V58L50 66L36 58V42L50 34Z"
                  fill="url(#emGrad)"
                  fillOpacity="0.25"
                />
                <circle cx="50" cy="50" r="7" fill="#10B981" />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-primary border-2 border-vault-bg"></span>
            </span>
          </div>

          {/* Protocol Version Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-dim border border-emerald-primary/20 text-emerald-accent text-[11px] font-mono tracking-widest uppercase mb-3">
            Sovereign Vault
          </div>

          {/* Header Text */}
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
            Create an account
          </h1>
          <p className="text-vault-subtext text-sm text-center max-w-xs mb-8">
            Deploy your secure personal vault and financial intelligence unit.
          </p>

          {/* Form Container Card */}
          <div className="w-full bg-vault-card border border-vault-border rounded-2xl p-6 shadow-vault-card">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name & Last Name (Grid layout) */}
              <div className="grid grid-cols-2 gap-3">
                {/* First Name Field */}
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-2"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-mono tracking-wider text-vault-subtext uppercase"
                      >
                        First Name
                      </FieldLabel>

                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />

                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          placeholder="Jane"
                          aria-invalid={fieldState.invalid}
                          className="pl-10 h-12 bg-vault-surface border-vault-border text-vault-text placeholder:text-vault-muted rounded-xl focus-visible:ring-1 focus-visible:ring-emerald-primary focus-visible:border-emerald-primary"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Last Name Field (Optional) */}
                <Controller
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="space-y-2"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-xs font-mono tracking-wider text-vault-subtext uppercase flex items-center justify-between"
                      >
                        <span>Last Name</span>
                        <span className="text-[10px] text-vault-muted normal-case font-normal">
                          (Optional)
                        </span>
                      </FieldLabel>

                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />

                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          placeholder="Doe"
                          aria-invalid={fieldState.invalid}
                          className="pl-10 h-12 bg-vault-surface border-vault-border text-vault-text placeholder:text-vault-muted rounded-xl focus-visible:ring-1 focus-visible:ring-emerald-primary focus-visible:border-emerald-primary"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Email Field */}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-mono tracking-wider text-vault-subtext uppercase"
                    >
                      Work Email
                    </FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />

                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="name@company.com"
                        aria-invalid={fieldState.invalid}
                        className="pl-10 h-12 bg-vault-surface border-vault-border text-vault-text placeholder:text-vault-muted rounded-xl focus-visible:ring-1 focus-visible:ring-emerald-primary focus-visible:border-emerald-primary"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-mono tracking-wider text-vault-subtext uppercase"
                    >
                      Master Key (Password)
                    </FieldLabel>

                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />

                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        aria-invalid={fieldState.invalid}
                        className="pl-10 pr-10 h-12 bg-vault-surface border-vault-border text-vault-text placeholder:text-vault-muted rounded-xl focus-visible:ring-1 focus-visible:ring-emerald-primary focus-visible:border-emerald-primary font-mono"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-vault-muted hover:text-vault-text transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    defaultChecked
                    className="mt-0.5 border-vault-border data-[state=checked]:bg-emerald-primary data-[state=checked]:text-black data-[state=checked]:border-emerald-primary rounded"
                  />
                  <FieldLabel
                    htmlFor="agreeTerms"
                    className="text-xs text-vault-subtext cursor-pointer leading-tight"
                  >
                    I agree to the{" "}
                    <a
                      href="#terms"
                      className="text-emerald-accent hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#privacy"
                      className="text-emerald-accent hover:underline"
                    >
                      Security Protocol
                    </a>
                  </FieldLabel>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-emerald-primary hover:bg-emerald-accent text-[#041d14] font-bold text-sm tracking-wide rounded-xl shadow-emerald-glow transition-all duration-200 mt-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-[#041d14] border-t-transparent rounded-full animate-spin" />
                    Initializing Vault...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Sovereign Vault &rarr;
                  </span>
                )}
              </Button>
            </form>

            {/* Social Auth Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-vault-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                <span className="bg-vault-card px-3 text-vault-muted">
                  Or Sign Up With
                </span>
              </div>
            </div>

            {/* Google Sign-In */}
            <div className="grid">
              <Button
                type="button"
                variant="outline"
                className="h-11 bg-vault-surface hover:bg-vault-card border-vault-border text-vault-text rounded-xl text-xs font-semibold"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.8-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-vault-subtext">
              Already have a vault?{" "}
              <Link to={paths.login}>
                <a className="text-emerald-primary hover:text-emerald-accent font-semibold ml-1 inline-flex items-center gap-0.5">
                  Log in <span className="text-xs">&rarr;</span>
                </a>
              </Link>
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vault-surface/80 border border-vault-border text-[11px] text-vault-muted font-mono tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-primary" />
              256-BIT ZERO KNOWLEDGE PROTOCOL
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

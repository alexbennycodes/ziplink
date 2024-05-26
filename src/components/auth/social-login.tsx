"use client";

import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { GithubLogo, GoogleLogo } from "../icons/logos";
import { Button } from "../ui/button";

const socialProviders = [
  {
    name: "Continue with Google",
    icon: <GoogleLogo className="h-4 w-4" />,
    provider: "google",
  },
  {
    name: "Continue with GitHub",
    icon: <GithubLogo className="h-4 w-4" />,
    provider: "github",
  },
];

const SocialLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      toast.error("An error occurred while trying to sign in");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {socialProviders.map((sp) => (
        <Button
          key={sp.provider}
          variant="outline"
          className="w-full flex items-center gap-3"
          disabled={loading}
          name={sp.name}
          onClick={() => handleSocialLogin(sp.provider)}
        >
          {provider === sp.provider ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            sp.icon
          )}
          <span>{sp.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default SocialLogin;

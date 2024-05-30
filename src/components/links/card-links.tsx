"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { formatDate } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  url: string;
  slug: string;
  createdAt: Date;
  clicks: number;
};

const CardLinks = ({ url, slug, createdAt, clicks }: Props) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyUrl = "https://ziplink1.vercel.app/" + slug;

  const handleCopy = () => {
    copy(copyUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch((error) => {
        toast.error(
          "An unexpected error has occurred. Please try again later.",
          {
            description: error,
          }
        );
      });
  };

  return (
    <div className="border bg-background px-5 py-3 rounded w-full space-y-4 hover:shadow-lg transition-all ease-in-out duration-300">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3
            className="font-mono font-bold text-lg hover:cursor-pointer hover:underline"
            onClick={handleCopy}
          >
            /{slug}
          </h3>
          <Button size="icon" onClick={handleCopy} variant="ghost">
            {isCopied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <CopyIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div>
          <div className="flex cursor-default items-center space-x-2 text-sm">
            <span className="">{clicks} clicks</span>
          </div>
        </div>
      </div>
      <h2 className="text-foreground/60 truncate font-mono">{url}</h2>
      <p className="text-foreground/40 text-right text-sm">
        {formatDate(createdAt)}
      </p>
    </div>
  );
};

export default CardLinks;

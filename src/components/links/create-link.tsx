"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLink } from "@/lib/api/links/mutations";
import { checkIfSlugExist } from "@/lib/api/links/queries";
import { insertLinkParams } from "@/lib/db/schema/links";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, RocketIcon, ShuffleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  children: ReactNode;
}

const FORBIDDEN_SLUGS = [
  "dashboard",
  "settings",
  "setting",
  "account",
  "accounts",
  "home",
];

function generateRandomString(length: number = 7) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const CreateLinkSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL is required." })
    .url({
      message: "Please enter a valid URL. Include http:// or https://",
    })
    .regex(/^(?!.*(?:http|https):\/\/(?:ziplink|ziplinkr)\.vercel\.app).*$/, {
      message: "You cannot redirect to the Ziplink url.",
    })
    // not contain any blank spaces
    .regex(/^\S+$/, {
      message: "URL must not contain any blank spaces.",
    }),
  slug: z
    .string()
    .min(7, {
      message: "Short link is required and must be at least 7 characters long.",
    })
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message:
        "Custom short link must not contain any blank spaces or special characters.",
    })
    .refine((value) => !FORBIDDEN_SLUGS.includes(value), {
      message:
        "This slug already exists. Write another or generate a random slug.",
    }),
});

const CreateLink = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateLinkSchema>>({
    resolver: zodResolver(CreateLinkSchema),
    defaultValues: {
      url: "",
      slug: "",
    },
  });

  const handleGenerateRandomSlug = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const randomSlug = generateRandomString(7);
    form.setValue("slug", randomSlug);
    form.clearErrors("slug");
  };

  const onSubmit = async (values: z.infer<typeof CreateLinkSchema>) => {
    // Check if slug & url are equals to prevent infinite redirect =>
    if (values.slug === values.url) {
      setLoading(false);
      setError(true);
      setMessage("The URL and the slug cannot be the same");
      return;
    }

    try {
      setLoading(true);

      const slugExists = await checkIfSlugExist(values.slug);

      if (slugExists) {
        form.setError("slug", {
          type: "custom",
          message:
            "This slug already exists. Write another or generate a random slug.",
        });
        return;
      }

      const result = await createLink(values);

      if (result.error) {
        toast.info(result.error);
        return;
      }

      toast.success("Link created successfully", {
        description: `Url: https://ziplink.vercel.app/${values.slug}`,
        duration: 10000,
        closeButton: true,
      });

      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("An unexpected error has occurred. Please try again later.");
    } finally {
      setError(false);
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        form.reset();
      }}
    >
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination URL:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="https://"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short link:</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          placeholder="mylink"
                          disabled={loading}
                          onChange={(e) => {
                            field.onChange(e);
                            form.clearErrors("slug");
                          }}
                        />
                        <Button
                          onClick={handleGenerateRandomSlug}
                          variant="outline"
                          className="absolute right-0 rounded-none rounded-br-md rounded-tr-md"
                        >
                          <ShuffleIcon size={14} />
                          <span>Randomize</span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* {isError && <Alert variant="error">{message}</Alert>} */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderIcon size={16} className="animate-spin" />
                ) : (
                  <RocketIcon size={16} />
                )}
                <span>{loading ? "Creating..." : "Create"}</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;

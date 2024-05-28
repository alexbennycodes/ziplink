import { createLink, deleteLink, updateLink } from "@/lib/api/links/mutations";
import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import {
  insertLinkParams,
  linkIdSchema,
  updateLinkParams,
} from "@/lib/db/schema/links";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const { session } = await getUserAuth();
    if (!session) return new Response("Unauthorized", { status: 400 });
    const data = await req.json();

    const { link } = await createLink(data);

    revalidatePath("/dashboard");

    return new Response(
      JSON.stringify({ message: "New Ziplink created", success: true, link }),
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function PUT(req: Request) {
  try {
    const { session } = await getUserAuth();
    if (!session) return new Response("Unauthorized", { status: 400 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedData = updateLinkParams.parse(await req.json());
    const validatedParams = linkIdSchema.parse({ id });

    const { link } = await updateLink(validatedParams.id, validatedData);

    return NextResponse.json(link, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err.message, { status: 500 });
    }
  }
}

export async function DELETE(req: Request) {
  try {
    const { session } = await getUserAuth();
    if (!session) return new Response("Unauthorized", { status: 400 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const validatedParams = linkIdSchema.parse({ id });
    const { link } = await deleteLink(validatedParams.id);

    return NextResponse.json(link, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    } else {
      return NextResponse.json(err.message, { status: 500 });
    }
  }
}

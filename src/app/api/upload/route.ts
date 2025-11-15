import { updateUserProfile } from "@/lib/profile/queries";
import { AppError } from "@/utils/api-error";
import { pinata } from "@/utils/config-pinata";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false
    },
};

export async function POST(request: NextRequest) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    try {
        const data = await request.formData();
        const userId = data.get("userId") as unknown as number
        const file: File | null = data.get("file") as unknown as File;

        if (!file.type.endsWith("png") && !file.type.endsWith("jpeg") && !file.type.endsWith("webp")) {
            throw new AppError("Format not supported", 415);
        }

        if (file.size > MAX_SIZE) {
            throw new AppError("File too large", 413);
        }
        const { cid } = await pinata.upload.public.file(file);
        const url = await pinata.gateways.public.convert(cid)
        await updateUserProfile(Number(userId), { avatarUrl: url });
        return NextResponse.json(url, { status: 200 });
    } catch (e) {
        console.log(e);
        if (e instanceof AppError) {
            return NextResponse.json(
                { error: e.message },
                { status: e.status }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
} 